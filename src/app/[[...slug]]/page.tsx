import { DynamicComponent } from '@/components/components-registry';
import { resolveStaticProps } from '@/utils/static-props-resolvers';
import { allContent } from '@/utils/content';
import { PageComponentProps } from '@/types';

export default async function Page({ params }) {
    const props = await getData(params);
    return <DynamicComponent {...props} />;
}
export async function generateStaticParams() {
    const allData = allContent();
    const paths = allData.map((obj) => obj.__metadata.urlPath).filter(Boolean);

    // Return params for static generation
    return paths.map((path) => ({
        slug: path.split('/').filter(Boolean)
    }));
}

export async function generateMetadata({ params }) {
    const urlPath = '/' + (params.slug || []).join('/');
    const allData = allContent();
    const props = resolveStaticProps(urlPath, allData);

    return {
        title: (props as any).pageTitle || 'Default Title'
    };
}

export async function getData(params) {
    const urlPath = '/' + (params.slug || []).join('/');
    const allData = allContent();
    return resolveStaticProps(urlPath, allData);
}
