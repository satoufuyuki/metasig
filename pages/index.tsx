import Image from "next/image";
import {
	useCallback,
	useState,
} from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import * as Karawang from "../public/Karawang.json";
import * as Purwakarta from "../public/Purwakarta.json";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

  
export default function Home() {
	const refreshMaps = (active: typeof cities[0]) => {
		map?.panTo({ lat: active.center[0], lng: active.center[1] });
		setMap(map);
		if (polylines.length) {
			for (const polyline of polylines) {
				polyline.setMap(null);
			}
		}

		if (currentMonth !== "") {
			for (const distribution of active.distribution) {
				const flightPath = new window.google.maps.Polyline({
					path: distribution.routes.map(x => ({ lat: x[0], lng: x[1] })),
					geodesic: true,
					strokeColor: distribution.color,
					strokeOpacity: 1.0,
					strokeWeight: 2,
					icons: [
						{
							icon: {
								path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
							},
							offset: "100%",
						},
					],
				});
				
				flightPath.setMap(map);
				setPolylines(old => old.concat(flightPath));
			}
		}
	}

	const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
	const [currentActive, setActive] = useState(0);
	const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);
	const [currentMonth, setCurrentMonth] = useState("");
	const cities = [
		Karawang,
		Purwakarta
	];

	const [map, setMap] = useState<google.maps.Map | null>(null);

	return (
		<div className="flex flex-col justify-between min-h-screen">
		<Navbar/>
		<br></br>
		<br></br>
		<section className="flex justify-center items-center w-full mt-10">
			<div className="w-[90%] flex flex-col">
				<div className="inline-flex items-center justify-center gap-x-4">
					<Image
						src={"/globe.png"}
						width={40}
						height={40}
						alt="Globe"
						className="w-[30px] h-[30px] lg:h-[40px] lg:w-[40px]"
					></Image>
					<h1 className="font-bold lg:text-3xl text-xl">Peta Persebaran Distribusi</h1>
				</div>
				<select onChange={e => {
					setCurrentMonth(e.target.value);
					refreshMaps(cities[currentActive]);
				}} className="select w-full lg:max-w-xs mt-5">
					<option disabled selected>Pilih Bulan</option>
					{months.map((x, i) => (<option key={i} value={x}>{x}</option>))}
				</select>
				<br></br>
				<nav>
					{cities.map((x, i) => (<button 
						className={`transition-all ease-in-out delay-100 p-4 rounded-t-lg ${currentActive === i ? "bg-base-300" : "hover:bg-base-100"}`} onClick={() => {
							setActive(i);
							refreshMaps(cities[currentActive]);
						}} key={i}>{x.name}</button>
					))}
				</nav>
				<div className={`rounded-b-lg rounded-tr-lg bg-base-300 p-5 shadow-lg ${currentActive === 0 ? "" : "rounded-tl-lg"}`}>
					<LoadScript googleMapsApiKey="AIzaSyAkSNlIFoRu8IgSYKtGGwpVTjHTjbRd4RE">
						<GoogleMap
							mapContainerStyle={{ width: "100%", height: "450px" }}
							center={{ lat: cities[currentActive].center[0], lng: cities[currentActive].center[1] }}
							zoom={8.4}
							onLoad={(map) => setMap(map)}
							onUnmount={() => setMap(null)}
							options={{
								disableDefaultUI: true,
								mapTypeId: "terrain",
								styles: [
									{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
									{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
									{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
									{
										featureType: "administrative.locality",
										elementType: "labels.text.fill",
										stylers: [{ color: "#d59563" }],
									},
									{
										featureType: "poi",
										elementType: "labels.text.fill",
										stylers: [{ color: "#d59563" }],
									},
									{
										featureType: "poi.park",
										elementType: "geometry",
										stylers: [{ color: "#263c3f" }],
									},
									{
										featureType: "poi.park",
										elementType: "labels.text.fill",
										stylers: [{ color: "#6b9a76" }],
									},
									{
										featureType: "road",
										elementType: "geometry",
										stylers: [{ color: "#38414e" }],
									},
									{
										featureType: "road",
										elementType: "geometry.stroke",
										stylers: [{ color: "#212a37" }],
									},
									{
										featureType: "road",
										elementType: "labels.text.fill",
										stylers: [{ color: "#9ca5b3" }],
									},
									{
										featureType: "road.highway",
										elementType: "geometry",
										stylers: [{ color: "#746855" }],
									},
									{
										featureType: "road.highway",
										elementType: "geometry.stroke",
										stylers: [{ color: "#1f2835" }],
									},
									{
										featureType: "road.highway",
										elementType: "labels.text.fill",
										stylers: [{ color: "#f3d19c" }],
									},
									{
										featureType: "transit",
										elementType: "geometry",
										stylers: [{ color: "#2f3948" }],
									},
									{
										featureType: "transit.station",
										elementType: "labels.text.fill",
										stylers: [{ color: "#d59563" }],
									},
									{
										featureType: "water",
										elementType: "geometry",
										stylers: [{ color: "#17263c" }],
									},
									{
										featureType: "water",
										elementType: "labels.text.fill",
										stylers: [{ color: "#515c6d" }],
									},
									{
										featureType: "water",
										elementType: "labels.text.stroke",
										stylers: [{ color: "#17263c" }],
									},
								]
							}}
						>

						</GoogleMap>
					</LoadScript>
				</div>
			</div>
		</section>
		<section className="flex justify-center items-center w-full mt-10">
			<div className="w-[90%] flex flex-col">
				<div className="inline-flex items-center justify-center gap-x-4">
					<Image
						src={"/bar-chart.png"}
						width={40}
						height={40}
						alt="Globe"
						className="w-[30px] h-[30px] lg:h-[40px] lg:w-[40px]"
					></Image>
					<h1 className="font-bold lg:text-3xl text-xl">Grafik Distribusi</h1>
				</div>
				<div className="flex flex-col gap-y-5 lg:flex-row items-center justify-center gap-x-5 mt-4">
					<div className="transition-all ease-in-out delay-150 w-[350px] h-[190px] md:w-[400px] md:h-[250px] lg:w-[450px] lg:h-[250px] bg-base-200 p-4 rounded-md shadow-md">
						<Line
							options={{
								backgroundColor: "#FFFFFF",
								responsive: true,
								plugins: {
									legend: {
										display: true,
										position: "top"
									},
									title: {
										display: true,
										text: "Stok Bahan Pangan"
									}
								}
							}}
							data={{
								labels: months,
								datasets: cities[currentActive].distribution.map(d => ({
									label: d.name,
									borderColor: d.color,
									data: d.data.map(x => x.availability)
								}))
							}}
						/>
					</div>
					<div className="transition-all ease-in-out delay-150 w-[350px] h-[190px] md:w-[400px] md:h-[250px] lg:w-[450px] lg:h-[250px] bg-base-200 p-4 rounded-md shadow-md">
						<Line
							options={{
								backgroundColor: "#FFFFFF",
								responsive: true,
								plugins: {
									legend: {
										display: true,
										position: "top"
									},
									title: {
										display: true,
										text: "Bahan Pangan yang Terdistribusi"
									}
								}
							}}
							data={{
								labels: months,
								datasets: cities[currentActive].distribution.map(d => ({
									label: d.name,
									borderColor: d.color,
									data: d.data.map(x => x.distributed)
								}))
							}}
						/>
					</div>
				</div>
			</div>
		</section>
		<Footer/>
		</div>
	);
}
