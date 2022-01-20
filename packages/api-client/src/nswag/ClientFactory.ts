import { AuthClient, CeremonyClient } from './clients';

export class ClientFactory {
    private static GetUrl(): string {
        return process.env.REACT_APP_MEDIATOR_SERVICE || '';
    }

    public static GetAuthClient(): AuthClient {
        const url = this.GetUrl();
        return new AuthClient(url);
    }

    public static GetCeremonyClient(): CeremonyClient {
        const url = this.GetUrl();
        return new CeremonyClient(url);
    }
}