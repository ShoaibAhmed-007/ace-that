import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Left side with image and text */}
      <div
        className="flex-1 relative p-12 text-gray-50"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          className="text-center text-5xl font-extrabold mb-4"
          style={{ fontFamily: "cursive" }}
        >
          Welcome to <span className="text-[#FF9202]">AceThat!</span>
        </h1>
        <p
          className="mt-[16em] ml-[-35px] w-[55%] text-[24px] text-[#023E24] font-extrabold"
          style={{ fontFamily: "cursive" }}
        >
          "Mock your interview with confidence! Our AI-powered platform helps
          you practice"
        </p>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="bg-gray-50 p-8 rounded shadow-md max-w-md w-full">
          {/* <h2 className="text-2xl font-semibold mb-4">
            Sign in to AI Interview Mocker
          </h2>
          <p>Welcome back! Please sign in to continue</p>

          <button className="bg-blue-500 text-gray-50 p-2 rounded w-full mt-4">
            Facebook
          </button>

          <button className="bg-gray-500 text-gray-50 p-2 rounded w-full mt-4">
            Google
          </button>

          <div className="flex items-center mt-4">
            <span className="flex-grow border-t"></span>
            <span className="px-2 text-gray-500">or</span>
            <span className="flex-grow border-t"></span>
          </div>

          <input
            type="email"
            placeholder="Email address"
            className="p-2 border rounded w-full mt-4"
          /> */}

          <SignIn />

          <p className="text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
