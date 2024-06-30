export default function PageHeaders({
    h1Text = 'Hello',
    h2Text = 'Subheader',
}) {
    return (
        <section className="text-center mt-16 mb-8">
        <h1 className="text-3xl">
          {h1Text}
        </h1>
        <h2 className="text-white/75">
          {h2Text}
        </h2>
      </section>
    );
}