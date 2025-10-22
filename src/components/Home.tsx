import {Flex} from "@chakra-ui/react";

import './Home.css';
export default function Home() {
  return (
    <Flex justify="center" height="100%">
      <iframe
        className="spotify-embed"
        src="https://open.spotify.com/embed/artist/4S3tOMrY2Xj9zhnmema3M3?utm_source=generator"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy">
      </iframe>
    </Flex>
  );
}