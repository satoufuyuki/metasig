import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content mt-5 px-8">
            <div className="items-center grid-flow-col">
                <Image src={"/TN LOGO-01.png"} height={36} width={36} alt="Technopark Neskar Logo"></Image>
                <p>Copyright © Technopark Neskar 2022 - All right reserved</p>
            </div> 
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <Link href="https://instagram.com/technoparkneskar" target={"_blank"}>
                    <FontAwesomeIcon icon={faInstagram} size="2x"/>
                </Link>
                <Link href="mailto:technopakneskar@gmail.com">
                    <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                </Link>
            </div>
        </footer>
    )
}