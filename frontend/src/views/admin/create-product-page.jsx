import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống."),
  price: z.coerce
    .number()
    .min(1, "Giá sản phẩm không được để trống và phải lớn hơn hoặc bằng 1."),
});

const CreateProductPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Thêm mới sản phẩm
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-md border">
          <div className="mx-2 my-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="grid gap-1 mb-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên sản phẩm</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập tên sản phẩm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá sản phẩm</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Nhập giá sản phẩm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="item-weight"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Item Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="item-weight"
                      id="item-weight"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="12"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="item-weight"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Item Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="item-weight"
                      id="item-weight"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="12"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="item-weight"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Item Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="item-weight"
                      id="item-weight"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="12"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="item-weight"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Item Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="item-weight"
                      id="item-weight"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="12"
                      required=""
                    />
                  </div>

                  <div className="sm:col-span-2 mb-3">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="8"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your description here"
                    ></textarea>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <Button variants="primary" type="submit">
                    Add product
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
