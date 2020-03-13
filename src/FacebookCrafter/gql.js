import gql from "graphql-tag";


export const GET_ACCOUNTS = gql`
    query {
        accounts {
            id
            name
        }
    }
`;

export const GET_CAMPAIGNS = gql`
    query campaigns($accountId: ID!){
        campaigns(accountId: $accountId) {
            id
            name
        }
    }
`;

export const GET_AD_SETS = gql`
    query adSets($campaignId: ID!) {
        adSets(campaignId: $campaignId) {
            id
            name
        }
    }
`;

export const GET_COUNTRIES = gql`
    query {
        countries {
            name
            countryCode
        }
    }
`;

export const CRAFT_ADS = gql`
    mutation craftAds(
        $craftName: String!,
        $sourceAdSetId: ID!,
        $countryCode: String!,
        $csvData: String!,
        $targetAccountId: ID!,
        $targetCampaignId: ID!
    ) {
        craftAds(
            craftName: $craftName,
            sourceAdSetId: $sourceAdSetId,
            countryCode: $countryCode,
            csvData: $csvData,
            targetAccountId: $targetAccountId,
            targetCampaignId: $targetCampaignId
        )
    }
`;

export const PROGRESS_SUBSCRIPTION = gql`
    subscription progress {
        progress {
            name
            percents
            started
            finished
        }
    }
`;
