import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Not found</span>
          </nav>
          <p className="eyebrow">Error 404</p>
          <h1>This page could not be found.</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="lead">
            The page you are looking for may have moved. Explore our practice areas or contact the
            firm and we will point you in the right direction.
          </p>
          <div className="button-row">
            <Link className="btn btn--navy" href="/practice-areas">
              Explore our practice <span>↗</span>
            </Link>
            <Link className="text-link" href="/">
              Back to home <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
