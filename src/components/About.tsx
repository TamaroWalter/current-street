import { Button, Container, Image, IconButton } from "@chakra-ui/react"
import { FaCircleArrowRight } from "react-icons/fa6";
import bandfoto_1 from '../data/pix/bandfoto_1.jpg';

interface Photo {
  id: number;
  source: string;
  alt: string;
}

export default function About() {
  return (
    <Image height="30rem" fit="contain" rounded="md" src={bandfoto_1} alt="We are Current Street">
      <IconButton>
        <FaCircleArrowRight />
      </IconButton>
    </Image >
  );
}