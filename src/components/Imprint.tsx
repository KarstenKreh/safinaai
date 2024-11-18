const Imprint: React.FC = () => {
  return (
    <>
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-[800px] mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Imprint</h1>
            
            <h2 className="text-xl font-semibold mb-4">Information according to § 5 DDG</h2>
            
            <p className="mb-6">
              Safina AI is a trademark of<br />
              Karsten's Kohle UG<br />
              Schwanthalerstr. 141<br />
              80339 Munich
            </p>

            <h3 className="text-lg font-semibold mb-2">Represented by:</h3>
            <p className="mb-6">Karsten Kreh</p>

            <h3 className="text-lg font-semibold mb-2">Register entry:</h3>
            <p>
              Entry in the commercial register.<br />
              Register court: Munich<br />
              Register number: HRB293239
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Imprint;
