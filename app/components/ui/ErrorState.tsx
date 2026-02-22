import Button from "./Button";

const ErrorState = ({ message="حدث خطأ" }: { message?: string }) => (
  <div className="text-center py-20">
    <p className="text-[#FF6400] font-semibold mb-3">{message}</p>
    <Button
        onClick={() => window.location.reload()}
    >
      إعادة المحاولة
    </Button>
  </div>
);

export default ErrorState;
