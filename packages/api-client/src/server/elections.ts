/* eslint-disable max-classes-per-file */
import { get, post, put } from '../utils/http';
import {
    ElectionConstants,
    Election,
    ElectionQueryResponse,
    SubmitElectionRequest,
    ElectionManifest,
    CiphertextElectionContext,
    MakeElectionContextRequest,
    MakeElectionContextResponse,
} from '../models/election';
import { BaseQueryRequest, BaseResponse } from '../models/base';

// export const getElections = (): ElectionRow[] => {
//     const date = new Date();
//     const laterDate = new Date();
//     laterDate.setDate(date.getDate() + 10);
//     return [
//         new ElectionRow('election-1s', 'Election 1 server', 'Maryland', 'Montgomery County', date, true),
//         new ElectionRow('election-2s', 'Election 2 server', 'Maryland', 'Montgomery County', date),
//         new ElectionRow('election-3s', 'Election 3 server', 'Maryland', 'Montgomery County', date),
//         new ElectionRow('election-4s', 'Election 4 server', 'Maryland', 'Montgomery County', laterDate),
//         new ElectionRow('election-5s', 'Election 5 server', 'Maryland', 'Montgomery County', laterDate),
//     ];
// };

export const getConstants = async (): Promise<ElectionConstants | undefined> => {
    const path = `${process.env.REACT_APP_MEDIATOR_SERVICE}election/constants`;
    const response = await get<{ data: ElectionConstants }>(path);

    if (typeof response.parsedBody !== 'undefined') {
        return response.parsedBody.data;
    }
    return undefined;
};

export const getElection = async (election_id: string): Promise<Election[] | undefined> => {
    const path = `${process.env.REACT_APP_MEDIATOR_SERVICE}election?election_id=${election_id}`;
    const response = await get<{ data: ElectionQueryResponse }>(path);
    return response.parsedBody?.data.elections;
};

export const putElection = async (
    election_id: string,
    key_name: string,
    manifest: ElectionManifest,
    context: CiphertextElectionContext
): Promise<string | undefined> => {
    const data: SubmitElectionRequest = {
        election_id,
        key_name,
        manifest,
        context,
    };
    const path = `${process.env.REACT_APP_MEDIATOR_SERVICE}election`;
    const response = await put<{ status: string; message: string }>(path, data);

    if (typeof response.parsedBody !== 'undefined') {
        return response.parsedBody.status;
    }
    return undefined;
};

class ElectionQueryRequest extends BaseQueryRequest {}

export const findElection = async (
    filter: any,
    skip: number,
    limit: number
): Promise<Election[]> => {
    const elections: Election[] = [];
    const data: ElectionQueryRequest = {
        filter,
    };
    const path = `${process.env.REACT_APP_GUARDIAN_SERVICE}election/find?skip=${skip}&limit=${limit}`;

    const response = await post<{ resp: ElectionQueryResponse }>(path, data);
    if (typeof response.parsedBody !== 'undefined') {
        response.parsedBody.resp.elections.forEach((item) => {
            elections.push(item);
        });
    }

    return elections;
};

export const openElection = async (election_id: string): Promise<boolean | undefined> => {
    const path = `${process.env.REACT_APP_GUARDIAN_SERVICE}election/open?election_id=${election_id}`;

    const response = await post<{ resp: BaseResponse }>(path, {});
    return response.parsedBody?.resp.is_success();
};

export const closeElection = async (election_id: string): Promise<boolean | undefined> => {
    const path = `${process.env.REACT_APP_GUARDIAN_SERVICE}election/close?election_id=${election_id}`;

    const response = await post<{ resp: BaseResponse }>(path, {});
    return response.parsedBody?.resp.is_success();
};

export const publishElection = async (election_id: string): Promise<boolean | undefined> => {
    const path = `${process.env.REACT_APP_GUARDIAN_SERVICE}election/publish?election_id=${election_id}`;

    const response = await post<{ resp: BaseResponse }>(path, {});
    return response.parsedBody?.resp.is_success();
};

export const makeContextElection = async (
    elgamal_public_key: string,
    commitment_hash: string,
    number_of_guardians: number,
    quorum: number,
    manifest_hash = '',
    manifest = {}
): Promise<CiphertextElectionContext | undefined> => {
    const path = `${process.env.REACT_APP_GUARDIAN_SERVICE}election/context`;
    const data: MakeElectionContextRequest = {
        elgamal_public_key,
        commitment_hash,
        number_of_guardians,
        quorum,
        manifest_hash,
        manifest,
    };
    const response = await post<{ resp: MakeElectionContextResponse }>(path, data);
    return response.parsedBody?.resp.context;
};

export default getElection;
