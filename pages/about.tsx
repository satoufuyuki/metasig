import Link from "next/link";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export default function About() {
    return (<div className="flex flex-col justify-between min-h-screen">
        <Navbar/>
        <div></div>
        <div className="w-full flex justify-center items-center mt-5">
            <div className="w-[90%] flex flex-col gap-y-7">
                <div>
                    <h1 className="font-bold text-3xl">Tentang Kami</h1>
                    <p className="w-3/4 tracking-wide mt-2"><b>METASIG</b> adalah aplikasi berbasis <i>website</i> untuk melakukan <i>tracking</i> distribusi pangan yang ada di Indonesia yang dapat diketahui dari sistem informasi geografis di Indonesia terutama berfokus di Jawa Barat</p>
                </div>
                <div className="flex flex-col items-start justify-start gap-y-2">
                    <h1 className="font-bold text-3xl">Keunggulan Kami</h1>
                    <p className="tracking-wide mt-2">Berikut adalah beberapa keunggulan dari aplikasi kami:</p>
                    <ul className="list-disc tracking-wide ml-5">
                        <li>Realtime</li>
                        <li>Tanpa Biaya</li>
                        <li>Informasi Distribusi Jelas</li>
                        <li>User Friendly</li>
                        <li>Data Dapat Dipercaya</li>
                        <li>Dapat Memonitoring Ketersediaan Pangan</li>
                    </ul>
                </div>
                <div className="flex flex-col items-start justify-start gap-y-2">
                    <h1 className="font-bold text-3xl">Credits</h1>
                    <p className="tracking-wide mt-2">All icons that used in this website owned by <Link className="underline text-blue-500" href="https://flaticon.com">https://flaticon.com</Link></p>
                </div>
            </div>
        </div>
        <Footer/>
    </div>)
}