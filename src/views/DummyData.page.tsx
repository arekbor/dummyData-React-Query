import { FC } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { api } from "../api/api";
import { DummyData } from "../interfaces/DummyData";

const fetchDummyData = async (): Promise<DummyData[]> => {
	const res = await api<DummyData[]>({
		method: "get",
		url: "/api/dummy/data",
	});
	if (res.status === 200) {
		return res.data;
	}
	throw new Error(`status response: ${res.status}`);
};

const DummyDataView: FC = () => {
	const {
		isSuccess,
		isError,
		error,
		data,
	}: UseQueryResult<DummyData[], Error> = useQuery<DummyData[], Error>(
		"dummyData",
		fetchDummyData
	);

	if (isError) {
		return <div>{error.message}</div>;
	}

	if (isSuccess) {
		console.log(data);
	}

	return (
		<article>
			{data?.map((item) => {
				return <div>{item.data}</div>;
			})}
		</article>
	);
};

export default DummyDataView;
