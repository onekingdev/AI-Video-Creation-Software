// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const credentials = {
  privateKey: 'test_23cf36bbb43478ce9fc95147c62bc1e0c52b57ac59b771779b2d532640a',
  publicKey: 'test_a2208bdac9fd6f5d06aeb4c23b8b6085534e0da40282d464c10816da279'
};
const { audioblocks, videoblocks } = require('storyblocks-api')(credentials);

export default async function handler(req, res) {
  console.log('ajwepoi')
  const params = {
    keywords: 'mountain aerial',
    page: 1,
    numResults: 5
  };
  const search = await storyblocks.search(params);
  console.log('search', search)
  
  res.status(200).json({ name: 'John Doe' })
}
