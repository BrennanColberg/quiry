import { NextApiRequest, NextApiResponse } from 'next'

const RANDOM_WIKIMEDIA_IMAGE_URL =
  'https://commons.wikimedia.org/wiki/Special:Random/Image'
// disgusting, I know
const IMAGE_URL_FROM_PAGE_REGEX = /<div class="fullImageLink" id="file"><a href="([^"]+)"><img alt="[^"]+" src="([^"]+)"/

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const wikimediaResponse = await fetch(RANDOM_WIKIMEDIA_IMAGE_URL)
  const page = await wikimediaResponse.text()
  const url = IMAGE_URL_FROM_PAGE_REGEX.exec(page)[2]
  res.status(200).send(url)
}
