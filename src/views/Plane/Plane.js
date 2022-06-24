import React, { useEffect, useState } from 'react';
import { Title } from 'components/Title';
import { useCtx } from 'context/Context';
import { motion } from 'framer-motion';
import { Button, CanvasWrapper, Info, Wrapper } from './Plane.styles';
import Canvas from 'components/Canvas';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { storage, imagesRef, db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, Timestamp, collection } from 'firebase/firestore';

const Plane = () => {
    let image = uuidv4();
    const { canvasRef, fileUrl, setFileUrl, setStep } = useCtx();
    const [visitedBefore] = useState(window.localStorage.getItem('visited'));
    const imagesRef = ref(storage, `images/${image}`);

    const planesRef = collection(db, 'planes');

    useEffect(() => {
        window.localStorage.setItem('visited', '1');
    }, [visitedBefore]);

    const createPlane = async (url) => {
        try {
            await addDoc(planesRef, {
                canvas: url,
                timestamp: Timestamp.now(),
            });
        } catch (err) {
            alert(err);
        }
    };

    const saveCanvasToStorage = () => {
        const dataURL = canvasRef.current.toDataURL('image/png');

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

        uploadBytes(imagesRef, dataURLtoBlob(dataURL)).then((e) => {
            getDownloadURL(ref(storage, `images/${image}`)).then((url) => {
                setFileUrl(url);
                createPlane(url);
                setStep('PLANES_COUNT_INFO');
            });
        });
    };

    return (
        <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Title center>{visitedBefore ? `Send plane` : `Send your first \n paper plane`}</Title>
            <Info>Click to place stamp</Info>
            <CanvasWrapper>
                <Canvas />
            </CanvasWrapper>
            <Button onClick={saveCanvasToStorage}>Throw your plane</Button>
        </Wrapper>
    );
};

export default Plane;
