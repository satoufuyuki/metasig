export interface DistributionData {
    availability: number;
    distributed: number;
}

export interface DistributionDetails {
    name: string;
    routes: number[][];
    color: string;
    data: DistributionData[];
}

export interface Distribution {
    name: string;
    center: number[];
    distribution: DistributionDetails[];
}
