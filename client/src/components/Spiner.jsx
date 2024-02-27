const Spiner = () => {
  return (
    <div className="flex min-h-full items-center justify-center py-14">
      <div className="m-5 p-10">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center items-center py-3">
            <div className="animate-spin  rounded-full h-12 w-12 border-b-4 border-cust-btn"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spiner;
