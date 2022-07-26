import React, { useState } from 'react';
import { Title } from 'components/Title';
import { useCtx } from 'context/Context';
import { motion } from 'framer-motion';
import { Button, CanvasWrapper, Info, Wrapper, LoadingIcon } from './NewPlane.styles';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, Timestamp, collection } from 'firebase/firestore';
import Canvas from 'components/Canvas';
import useMeasure from 'react-use-measure';
import { db, storage } from '../../firebase';

const NewPlane = () => {
    let image = uuidv4();
    const { setStep, visitedBefore, user, planesCount, konvaRef, setPlanesCountInfoVariant } = useCtx();
    const [newPlaneRef, newPlaneBounds] = useMeasure();
    const [busy, setBusy] = useState();

    const imagesRef = ref(storage, `images/${image}`);

    const creationDate = () => {
        const dt = new Date();
        const day = dt.getDate();
        const month = dt.toLocaleDateString('en', { month: 'long' });
        const year = dt.getFullYear();
        const date = `${month} ${day}, ${year}`;
        return date;
    };

    const createPlane = async (url) => {
        try {
            await addDoc(collection(db, 'planes'), {
                canvas: url,
                timestamp: Timestamp.now(),
                owner: user,
                fetchCount: 0,
                creationDate: creationDate(),
                number: planesCount + 1,
                name: image,
            }).then(() => {
                setPlanesCountInfoVariant('NEW');
                setStep('PLANES_COUNT_INFO');
            });
        } catch (err) {
            alert(err);
        }
    };

    const saveCanvasToStorage = () => {
        const dataURL = konvaRef.current.toDataURL({
            pixelRatio: 1,
        });
        function dataURLtoBlob(dataURL) {
            var arr = dataURL.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        }

        const uploadTask = uploadBytesResumable(imagesRef, dataURLtoBlob(dataURL));

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress < 100) {
                    setBusy(true);
                } else {
                    setBusy(false);
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(imagesRef).then((url) => {
                    createPlane(url);
                });
            }
        );
    };

    return (
        <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Title center>{visitedBefore ? `Send plane` : `Send your first \n paper plane`}</Title>
            <Info>Click to place stamp</Info>
            <CanvasWrapper ref={newPlaneRef}>
                <Canvas width={newPlaneBounds.width} height={newPlaneBounds.height} variant="new" />
            </CanvasWrapper>
            {/* <Button onClick={saveCanvasToStorage}>Throw your plane</Button> */}
            <Button onClick={saveCanvasToStorage}>{busy ? <LoadingIcon /> : 'Throw your plane'}</Button>
        </Wrapper>
    );
};

export default NewPlane;
