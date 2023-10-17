export const config = {
  matcher: '/*',
}

const ALLOWED_COUNTRIES = ['CN', 'HK']

export default function middleware(request) {
  const url = new URL(request.url)

  const country = request.geo.country || 'CN'

  if (!ALLOWED_COUNTRIES.includes(country))
    url.pathname = '/blocked'

  return Response.redirect(url)
}
