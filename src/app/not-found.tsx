import Image from 'next/image';

export default function NotFound() {
  return (
    <section
      className="not-found"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: '1',
      }}
    >
      <Image src="/images/aphex.svg" width={300} height={300} alt="aphex 404" />
      <span>Page not found</span>
    </section>
  );
}
