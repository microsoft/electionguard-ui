/* eslint-disable max-classes-per-file */
import {
    ElectionConstants,
    Election,
    CiphertextElectionContext,
    ElectionState,
} from '../models/election';

function generateMockContext(
    commitment_hash = '4F642D946DB82268AF873F6359D85019CF9A3658B6655942AE7CF84F7382505B',
    manifest_hash = 'F50393532F36544827661DF2279755CFFA079D32C6E0A8E8570D1D91FBAAD245',
    number_of_guardians = 5,
    quorum = 3
): CiphertextElectionContext {
    return {
        commitment_hash,
        crypto_base_hash: 'B3B8CEA020B4C1CA796060D5B54ED24F20BEAB937F32C480D5648D3D38DC0882',
        crypto_extended_base_hash:
            '30CD485CBD768C6C2BB92867876D401509E94701B8D24F6CD89A28A1D0579862',
        elgamal_public_key:
            'B1CCFB49E3D0EA64FB0FE059291BE8C29AF358DFF7FCF8D546E1D846E120A7ECB9FB0BF4B1842F7FED78E57C3583A10154706194417D732CD88753BEB567267F004B6B14BF77AD60C552315072B6023A983241F902DD2B74B815F7F29ACC67D784858BDBB27D3865A50BAC6619E58B57B7758CFF6830A22E169F63A605164C7F1BA2CA790ACD5854CF8C980D01060EAADC484FC0F3554098581BB241FA60ACA932B8103BC8BFEC7D7F5779DEDB6837D084672ABB4BFA17D49C41DB8D6A5435827C1C1C86CA3EBA585181EEC64C76613D19CF4C97A617D0B19EF33A190777FCCE40C8667D9927005B9291B64E7FD0A589384B588717A6A5E632D3226BB8FC482369744881773BEC3B8EAAA37071B0797F5FA5E048A029693585AF68C006B19DE2B94E19334607ECBF69AE5D4C3FEDFC7B72D509D1139E58DDC907D1F43F9EEE90BAAB9D0C1D48E0E5D01EB259CAD7F7F24CE68AAD57E5C974032931C7EAFEBF1238F2FA8D5E5AEC297164E78E0E809E2F61B1228B7EF319837CE085E6DA47DF949027DC54C7A648BC0F2A6032184A9411966C48F528B4168B5633566CD481489CB1FAB52183658EB487423FB18A120E8B30832338A4CB72092734A4D01DB47AE0CC3C48FCA02CF432F5C334FC7C900C57BD4D506B8B84A7030863DC46463EC198734EC7D4CB8C7600CA2137EE36512BE1DAA076616C911A4BBE91B9E43F6745E7',
        manifest_hash,
        number_of_guardians,
        quorum,
    };
}

export const getConstants = async (): Promise<ElectionConstants | undefined> => ({
    large_prime: 1233,
    small_prime: 3,
    cofactor: 1,
    generator: 444,
});

export const getElection = async (election_id: string): Promise<Election[] | undefined> => [
    {
        election_id,
        key_name: 'key_ceremony_1',
        state: ElectionState.OPEN,
        manifest: '',
        context: generateMockContext(),
    },
];

export const findElection = async (
    _filter: any,
    _skip: number,
    _limit: number
): Promise<Election[] | undefined> => [
    {
        election_id: 'hamilton-general-election-1',
        key_name: 'key_ceremony_1',
        state: ElectionState.OPEN,
        manifest: '',
        context: generateMockContext(),
    },
];

export const openElection = async (_election_id: string): Promise<boolean | undefined> => true;

export const closeElection = async (_election_id: string): Promise<boolean | undefined> => true;

export const publishElection = async (_election_id: string): Promise<boolean | undefined> => true;

export const makeContextElection = async (
    _elgamal_public_key: string,
    commitment_hash: string,
    number_of_guardians: number,
    quorum: number,
    manifest_hash = '',
    _manifest = {}
): Promise<CiphertextElectionContext | undefined> =>
    generateMockContext(commitment_hash, manifest_hash, number_of_guardians, quorum);

export default getElection;
