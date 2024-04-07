import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"

export const Lift = ({pos}) => {

    const LENGTH=5
    const WIDTH=4
    const HEIGHT=5
    const WALL_THICKNESS=0.4

    const speed = 0.01;
    const leftDoor = useRef()
    const rightDoor = useRef()
    const [open, setOpen] = useState(false);

    useFrame(() => {
        if(open){
            console.log(open)
            if(leftDoor.current.position.x > (-WIDTH/2+WALL_THICKNESS)/2 - (WIDTH/2 - WALL_THICKNESS)){
                console.log(leftDoor.current.position)
                leftDoor.current.position.x -= speed
            }
            if(rightDoor.current.position.x < (WIDTH/2-WALL_THICKNESS)/2 + (WIDTH/2 - WALL_THICKNESS)){
                console.log(rightDoor.current.position)
                rightDoor.current.position.x += speed
            }
        }
        else {
            if(leftDoor.current.position.x < (-WIDTH/2+WALL_THICKNESS)/2){
                leftDoor.current.position.x += speed
            }
            if(rightDoor.current.position.x > (WIDTH/2-WALL_THICKNESS)/2){
                rightDoor.current.position.x -= speed
            }
        }
    })

    return (
        <group onClick={() => {setOpen(!open)}} position={pos}>
            <Wall
                doorRef={leftDoor}
                length={WALL_THICKNESS}
                width={WIDTH/2 - WALL_THICKNESS}
                height={HEIGHT-2*WALL_THICKNESS}
                color={"rgb(255,230,255)"}
                pos={[(-WIDTH/2+WALL_THICKNESS)/2, (HEIGHT)/2, (-LENGTH+WALL_THICKNESS)/2]}
            />
            <Wall
                doorRef={rightDoor}
                length={WALL_THICKNESS}
                width={WIDTH/2 - WALL_THICKNESS}
                height={HEIGHT- 2*WALL_THICKNESS}
                color={"rgb(255,230,255)"}
                pos={[(WIDTH/2-WALL_THICKNESS)/2, (HEIGHT)/2, (-LENGTH+WALL_THICKNESS)/2]}
            />
            <Wall
                length={WALL_THICKNESS}
                width={WIDTH-2*WALL_THICKNESS}
                height={HEIGHT-2*WALL_THICKNESS}
                pos={[0, HEIGHT/2, (LENGTH-WALL_THICKNESS)/2]}
            />
            <Wall
                length={LENGTH}
                width={WIDTH}
                height={WALL_THICKNESS}
                pos={[0, WALL_THICKNESS/2, 0]}
            />
            <Wall
                length={LENGTH}
                width={WIDTH}
                height={WALL_THICKNESS}
                pos={[0, HEIGHT-WALL_THICKNESS/2, 0]}
            />
            <Wall
                length={LENGTH}
                width={WALL_THICKNESS}
                height={HEIGHT-2*WALL_THICKNESS}
                pos={[0-(WIDTH-WALL_THICKNESS)/2, HEIGHT/2, 0]}
            />
            <Wall
                length={LENGTH}
                width={WALL_THICKNESS}
                height={HEIGHT-2*WALL_THICKNESS}
                pos={[(WIDTH-WALL_THICKNESS)/2, HEIGHT/2, 0]}
            />
        </group>
    )
}

function Wall ({length,width,height,pos,color,doorRef}) {

    width = width ? width : 1
    height = height ? height : 10
    length = length ? length : 10

    if(doorRef){
        height *= 0.99
        width *= 0.99
        length *= 0.99
    }

    return(
        <mesh ref={doorRef} position={pos}>
            <boxGeometry args={[width,height,length]}/>
            <meshStandardMaterial metalness={1}  color={color ? color : "rgb(255,255,255)"}/>
        </mesh>
    )
}