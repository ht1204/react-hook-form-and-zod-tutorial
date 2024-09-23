import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../context/UserContext";
import { tiers } from "../../assets/constants";


const FormSchema = z.object({
  email: z.string().email(),
  accept: z.literal(true, {
    errorMap: () => ({ message: "You must accept Terms and Conditions." }),
  }),
  tier: z
    .string({ invalid_type_error: "Please select a payment tier." })
    .refine((val) => tiers.map((tier) => tier.id).includes(val)),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const Form: FC = () => {
  const history = useNavigate();
  const { addUser, users } = useUserContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await new Promise(async (resolve) => {
      await setTimeout(() => {
        addUser({
          id: users.length + 1,
          email: data.email,
          tier: data.tier,
        });

        resolve(undefined);
      }, 3000);
    });

    history("/users");

  };

  return (
    <>
      <h1 className="text-gray-900 font-bold text-3xl">
        Create New Account
      </h1>
      <p className="text-gray-600 mt-4 mb-8 leading-relaxed">
        Become a member in just three easy steps.
      </p>
      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block">
            <span className="block">Email</span>
            <input
              type="text"
              className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
              {...register("email")}
              disabled={isSubmitting}
            />
          </label>
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="block border text-lg rounded w-6 h-6 border-gray-200 text-blue-600 focus:ring-0 focus:outline-none focus:ring-offset-0 disabled:text-gray-200 disabled:cursor-not-allowed"
              {...register("accept")}
              disabled={isSubmitting}
            />
            <span className="block ml-4">I accept the Terms of Service</span>
          </label>
          {errors.accept && (
            <p className="text-sm text-red-600 mt-1">{errors.accept.message}</p>
          )}
        </div>
        <div>
          <p className="block">Payment Tier</p>
          <ul className="space-y-2 mt-2">
            {tiers.map((tier) => {
              return (
                <li
                  className={`border rounded-lg border-gray-200 text-gray-900`}
                  key={tier.id}
                >
                  <label
                    className={`flex justify-between px-6 py-4 items-center cursor-pointer`}
                  >
                    <div>
                      <p className={`font-medium text-lg`}>{tier.name}</p>
                      <p className={`text-sm opacity-80`}>{tier.description}</p>
                    </div>
                    <div className="flex items-center">
                      <p className={`font-medium mr-4 text-sm`}>
                        {tier.price.toLocaleString("en-US", {
                          currency: "USD",
                          style: "currency",
                        })}
                      </p>
                      <input
                        type="radio"
                        className="w-6 h-6 border ring-0 border-gray-200 text-blue-600 disabled:text-gray-300 outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        value={tier.id}
                        {...register("tier")}
                        disabled={isSubmitting}
                      />
                    </div>
                  </label>
                </li>

              );
            })}
          </ul>
          {errors.tier && (
            <p className="text-sm text-red-600 mt-1">{errors.tier.message}</p>
          )}
        </div>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <button
          type="submit"
          className="w-full px-8 py-4 flex items-center justify-center uppercase text-white font-semibold bg-blue-600 rounded-lg disabled:bg-gray-100 disabled:text-gray-400"
          disabled={isSubmitting}
        >
          Create account
        </button>
      </form>
    </>
  );
};

export default Form;