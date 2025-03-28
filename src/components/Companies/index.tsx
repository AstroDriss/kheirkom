const data = [{ text: "Ibno Zohr" }];

const index = () => {
  return (
    <div className="text-center bg-lightpink">
      <div className="mx-auto max-w-2xl py-16 px-4s sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg my-10">Trusted by companies of all sizes</h2>
        <div>
          {data.map((item, i) => (
            <div key={i}>
              {/* <img src={item.imgSrc} alt={item.imgSrc} /> */}
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
