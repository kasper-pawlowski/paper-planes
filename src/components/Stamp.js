import React from 'react';
import { Rect, Group, Text, Circle, Star } from 'react-konva';

const Stamp = ({ position, location }) => {
    const colors = ['#d11806', '#333333', '#2e9399', '#216e9c', '#fb7426'];
    let color = colors[Math.floor(Math.random() * colors.length)];

    const date = () => {
        const dt = new Date();
        const day = dt.getDate();
        const month = dt.toLocaleDateString('en', { month: 'short' });
        const year = dt.getFullYear();
        const date = `${day} ${month.toUpperCase()} ${year}`;
        return date;
    };

    const stamp1 = (
        <Group x={position?.x} y={position?.y} width={130} height={130}>
            <Circle height={130} stroke={color} strokeWidth={3} dash={[4, 5]} />
            <Circle height={110} stroke={color} strokeWidth={3} />
            <Text
                text={location?.isoCode.toUpperCase()}
                fontSize={16}
                fill={color}
                centeredScaling={true}
                x={-65}
                y={-63}
                width={130}
                height={130}
                verticalAlign="middle"
                align="center"
                fontFamily="Rubik"
            />
            <Text
                text="ARRIVAL"
                fontSize={10}
                fill={color}
                centeredScaling={true}
                x={-65}
                y={-47}
                width={130}
                verticalAlign="middle"
                align="center"
                fontFamily="Rubik"
            />
            <Text
                text={location?.state.toUpperCase()}
                fontSize={10}
                fill={color}
                centeredScaling={true}
                x={-65}
                y={-35}
                width={130}
                verticalAlign="middle"
                align="center"
                fontFamily="Rubik"
            />
            <Rect x={-52} y={-20} width={104} height={3} fill={color} />
            <Rect x={-52} y={20} width={104} height={3} fill={color} />
            <Star x={-40} numPoints={5} innerRadius={4} outerRadius={10} fill={color} width={15} />
            <Star x={40} numPoints={5} innerRadius={4} outerRadius={10} fill={color} width={15} />
            <Text
                text={date()}
                fontSize={10}
                fill={color}
                centeredScaling={true}
                x={-65}
                y={-30}
                width={130}
                height={130}
                verticalAlign="middle"
                align="center"
                fontFamily="Rubik"
            />
        </Group>
    );

    const stamp2 = (
        <Group x={position?.x - 90} y={position?.y - 50}>
            <Rect x={0} y={0} width={180} height={100} stroke={color} cornerRadius={100} />
            <Rect x={5} y={5} width={170} height={90} stroke={color} cornerRadius={100} />
            <Text
                text={location?.state.toUpperCase()}
                fontSize={16}
                fill={color}
                x={0}
                y={15}
                width={180}
                height={100}
                align="center"
                fontFamily="Rubik"
            />
            <Text text={date()} fontSize={14} fill={color} width={180} height={100} verticalAlign="middle" align="center" fontFamily="Rubik" />
            <Text
                text={location?.country.toUpperCase()}
                fontSize={16}
                fill={color}
                x={0}
                y={73}
                width={180}
                height={100}
                align="center"
                fontFamily="Rubik"
            />
            <Rect x={30} y={65} width={120} height={1} fill={color} />
            <Rect x={30} y={35} width={120} height={1} fill={color} />
            <Star x={25} y={50} numPoints={5} innerRadius={4} outerRadius={10} fill={color} width={15} />
            <Star x={155} y={50} numPoints={5} innerRadius={4} outerRadius={10} fill={color} width={15} />
        </Group>
    );

    const stamp3 = (
        <Group x={position?.x - 65} y={position?.y - 65}>
            <Rect x={0} y={0} width={130} height={130} stroke={color} cornerRadius={15} />
            <Rect x={5} y={5} width={120} height={120} stroke={color} cornerRadius={10} />
            <Text text={date()} fontSize={14} fill={color} y={15} width={130} height={130} verticalAlign="middle" align="center" fontFamily="Rubik" />
            <Text
                text={location?.isoCode.toUpperCase()}
                fontSize={16}
                fill={color}
                x={30}
                y={42}
                width={130}
                height={130}
                verticalAlign="middle"
                align="center"
                fontFamily="Rubik"
                fontStyle="bold"
                letterSpacing={2}
            />
            <Text
                text={location?.state.toUpperCase()}
                fontSize={16}
                fill={color}
                x={0}
                y={16}
                width={130}
                height={130}
                align="center"
                fontFamily="Rubik"
                fontStyle="bold"
                letterSpacing={2}
            />
            <Text
                text="ARRIVAL"
                fontSize={12}
                letterSpacing={5}
                fill={color}
                x={0}
                y={42}
                width={130}
                height={130}
                align="center"
                fontFamily="Rubik"
            />
            <Rect x={15} y={63} width={100} height={1} fill={color} />
            <Rect x={15} y={98} width={50} height={1} fill={color} />
            <Rect x={15} y={103} width={50} height={1} fill={color} />
            <Rect x={15} y={108} width={50} height={1} fill={color} />
            <Rect x={15} y={113} width={50} height={1} fill={color} />
        </Group>
    );

    const stampsArray = [stamp1, stamp2, stamp3];

    return stampsArray[Math.floor(Math.random() * stampsArray.length)];
};

export default Stamp;
