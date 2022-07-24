import React, { useEffect, useState } from 'react';
import { Title } from 'components/Title';
import { useCtx } from 'context/Context';
import { motion } from 'framer-motion';
import { Button, CanvasWrapper, CreateNewPlaneButton, Info, NoPlanes, Wrapper } from './FetchPlane.styles';
import { db, storage } from '../../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Image } from 'react-konva';
import useMeasure from 'react-use-measure';
import Canvas from 'components/Canvas';
import useImage from 'use-image';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const FetchPlane = () => {
    const [plane, setPlane] = useState();
    const { planesCount, konvaRef, setStep, setFileUrl } = useCtx();
    const [measureRef, bounds] = useMeasure();

    let planeRef;

    if (plane?.id) {
        planeRef = doc(db, 'planes', plane.id);
    }

    let imageRef;
    if (plane?.name) {
        imageRef = ref(storage, `images/${plane.name}`);
    }

    const getRandomPlane = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    useEffect(() => {
        let unsubscribed = false;

        const q = query(collection(db, 'planes'), where('number', '==', getRandomPlane(1, planesCount + 1)));

        getDocs(q)
            .then((querySnapshot) => {
                if (unsubscribed) return;
                const newPlane = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setPlane(...newPlane);
            })
            .catch((err) => {
                if (unsubscribed) return;
                console.error('Failed to retrieve data', err);
            });
        return () => (unsubscribed = true);
    }, [planesCount]);

    const PrevCanvas = () => {
        const [image] = useImage(plane?.canvas, 'Anonymous');
        return <Image image={image} />;
    };

    const updatePlane = async (url) => {
        try {
            await updateDoc(planeRef, {
                canvas: url,
                fetchCount: plane?.fetchCount + 1,
            });
        } catch (err) {
            alert(err);
        }
    };

    const savePlane = () => {
        const dataURL = konvaRef?.current?.toDataURL();
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
        uploadBytes(imageRef, dataURLtoBlob(dataURL)).then((e) => {
            getDownloadURL(imageRef).then((url) => {
                setFileUrl(url);
                updatePlane(url);
            });
        });
        planesCount && setStep('PLANES_COUNT_INFO');
    };

    return plane ? (
        <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Title center>Send paper plane</Title>
            <Info>Click to place stamp</Info>
            <CanvasWrapper ref={measureRef}>
                <Canvas width={bounds.width} height={bounds.height} PrevCanvas={PrevCanvas} variant="fetch" />
            </CanvasWrapper>
            <Button onClick={savePlane}>Throw plane</Button>
        </Wrapper>
    ) : (
        <NoPlanes>
            <p>LOADING</p>
            {/* <p>You haven't made any paper planes yet</p> */}
            {/* <CreateNewPlaneButton onClick={() => setStep('NEW_PLANE')}>+ Create new plane</CreateNewPlaneButton> */}
        </NoPlanes>
    );
};

export default FetchPlane;
