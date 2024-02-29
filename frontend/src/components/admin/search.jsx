import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Nhập thông tin cần tìm"
        className="md:w-52 lg:w-80"
      />
    </div>
  );
};

export default Search;
