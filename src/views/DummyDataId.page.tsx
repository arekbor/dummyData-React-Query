import { FC } from "react";
import { api } from "../api/api";
import { DummyData } from "../interfaces/DummyData";
import { useParams } from "react-router-dom";
import { useQuery, UseQueryResult } from "react-query";

const fetchDummyDataById = async (
	id: string | string[] | undefined
): Promise<DummyData> => {
	if (typeof id === "string") {
		const res = await api<DummyData>({
			method: "get",
			url: `/api/dummy/data/${id}`,
		});
		if (res.status === 200) {
			return res.data;
		}
		throw new Error("dummy data not exists");
	}
	throw new Error("invalid id");
};

const DummyDataId: FC = () => {
	const params = useParams<{ id?: string }>();
	const {
		isError,
		data,
		error,
		isLoading,
	}: UseQueryResult<DummyData, Error> = useQuery<DummyData, Error>(
		["dummyData", params?.id],
		() => fetchDummyDataById(params?.id),
		{
			enabled: !!params.id,
		}
	);
	if (isLoading) {
		return <div className="loading">Loading data...</div>;
	}

	if (isError) {
		return <div className="error">{error.message}</div>;
	}
	return (
		<div className="error">
			<div>Id: {data?.id}</div>
			<div>Count: {data?.count}</div>
			<div>Data: {data?.data}</div>
			<div>Version: {data?.version}</div>
		</div>
	);
};

export default DummyDataId;
