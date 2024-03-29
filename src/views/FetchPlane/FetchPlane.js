import React, { useEffect, useState } from 'react';
import { Title } from 'components/Title';
import { useCtx } from 'context/Context';
import { motion } from 'framer-motion';
import { Button, CanvasWrapper, CreateNewPlaneButton, Info, NoPlanes, Wrapper, LoadingIcon, ButtonsWrapper, BackLink } from './FetchPlane.styles';
import { db, storage } from '../../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import useMeasure from 'react-use-measure';
import Canvas from 'components/Canvas';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import Loader from 'components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from 'react-icons/tb';

const FetchPlane = () => {
    const [plane, setPlane] = useState();
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState();
    const [isDirty, setIsDirty] = useState(false);
    const { planesCount, konvaRef } = useCtx();
    const [measureRef, bounds] = useMeasure();
    const navigate = useNavigate();

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
                setLoading(false);
            })
            .catch((err) => {
                if (unsubscribed) return;
                console.error('Failed to retrieve data', err);
            });
        return () => (unsubscribed = true);
    }, [planesCount]);

    const updatePlane = async (url) => {
        try {
            await updateDoc(doc(db, 'planes', plane.id), {
                canvas: url,
                fetchCount: plane?.fetchCount + 1,
            }).then(() => {
                navigate(`/planes-count-info`, { state: 'fetch-plane' });
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
        const uploadTask = uploadBytesResumable(imageRef, dataURLtoBlob(dataURL));

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
                getDownloadURL(imageRef).then((url) => {
                    updatePlane(url);
                });
            }
        );
    };

    return loading ? (
        <Loader />
    ) : plane ? (
        <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Title center>Send paper plane</Title>
            <div>
                <Info>Click to place stamp</Info>
                <CanvasWrapper ref={measureRef}>
                    <Canvas width={bounds.width} height={bounds.height} plane={plane} variant="fetch" setIsDirty={setIsDirty} />
                </CanvasWrapper>
            </div>
            <ButtonsWrapper>
                <BackLink to="/">
                    <TbArrowBackUp />
                </BackLink>
                <Button onClick={() => (isDirty ? savePlane() : alert('Place stamp first 😉'))}>{busy ? <LoadingIcon /> : 'Throw plane'}</Button>
            </ButtonsWrapper>
        </Wrapper>
    ) : (
        <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NoPlanes>
                <p>
                    No plane is flying yet <br /> {':('}
                </p>
                <CreateNewPlaneButton to="/new-plane">+ Create new plane</CreateNewPlaneButton>
            </NoPlanes>
        </Wrapper>
    );
};

export default FetchPlane;
