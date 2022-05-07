import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId:'ry53na2p',
    dataset:'production',
    apiVersion:'2022-05-03',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN ,
    ignoreBrowserTokenWarning: true
});

export const builder = ImageUrlBuilder(client)

export const urlFor = (source)=>(
    builder.image(source)
)
