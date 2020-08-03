import Enterprise_Types from "./enterprise-types";

export default interface Entreprises{

        id: number,
        email_enterprise: string,
        facebook: string,
        twitter: string,
        linkedin: string,
        phone: string,
        own_enterprise: string,
        enterprise_name: string,
        photo: string,
        description: string,
        city: string,
        country: string,
        value: number,
        share_price: number,
        enterprise_type: Enterprise_Types
}

