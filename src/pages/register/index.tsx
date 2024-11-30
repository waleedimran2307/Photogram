("use client");
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { UserSignIn } from "../../types";
import { Icons } from "../../components/ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import { toast } from "react-toastify";

const initialValues: UserSignIn = {
  email: "",
  password: "",
  confirm_password: "",
};

interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (_props) => {
  const [userInfo, setUserInfo] = useState(initialValues);
  const { googleSignIn, signUp } = useUserAuth();

  const navigate = useNavigate();

  //  email
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  // password
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  // confirm password
  const handleOnChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInfo({ ...userInfo, confirm_password: e.target.value });
  };

  // google Sign In
  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      await googleSignIn()
        .then(() => {
          toast.success("You have signup successfully!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (error) {
      console.log(" The error is : ", error);
    }
  };

  //  handle form submit
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(userInfo.email, userInfo.password)
        .then((res) => {
          console.log(res, "res");
          toast.success("You have signup successfully!");
          navigate("/");
        })

        .catch((error) => {
          console.log(error.message);

          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            toast.error("Email already is use!");
          } else {
            toast.error("Password should be at least 6 characters!");
          }
        });
    } catch (error) {
      console.log(" The error is : ", error);
    }
  };

  return (
    <>
      <div className="bg-slate-800 w-full h-screen">
        <div className="container mx-auto p-6 flex h-full">
          <div className="flex justify-center items-center w-full">
            <div className="p-6 w-2/3 hidden lg:block">
              <div className="grid grid-cols-2 gap-2">
                <img
                  className=" w-2/3 h-auto aspect-video rounded-3xl place-self-end"
                  src={image2}
                />
                <img
                  className=" w-2/4 h-auto aspect-auto rounded-3xl"
                  src={image1}
                />
                <img
                  className=" w-2/4 h-auto aspect-auto rounded-3xl place-self-end"
                  src={image4}
                />
                <img
                  className=" w-2/3 h-auto aspect-video rounded-3xl"
                  src={image3}
                />
              </div>
            </div>

            <div className="max-w-md rounded-xl border bg-card text-card-foreground shadow-sm">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center mb-4 flex flex-row items-center justify-center">
                    <img
                      src="/photogram-logo.png"
                      alt="No image"
                      className="w-12 h-12"
                    />
                    <h4 className="relative -left-2">PhotoGram</h4>
                  </CardTitle>
                    <CardDescription>
                      Enter your email below to create your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid">
                      <Button variant="outline" onClick={handleGoogleSignIn}>
                        <Icons.google className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="xyz@example.com"
                        value={userInfo.email}
                        onChange={(_e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChangeEmail(_e)
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={userInfo.password}
                        onChange={(_e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChangePassword(_e)
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmpassword">Confirm password</Label>
                      <Input
                        id="confirmpassword"
                        type="password"
                        placeholder="Confirm password"
                        value={userInfo.confirm_password}
                        onChange={(_e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChangeConfirmPassword(_e)
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button className="w-full" type="submit">
                      Register
                    </Button>
                    <p className="mt-3 text-sm text-center">
                      Already have an account ? <Link to="/login" className="text-slate-700 underline"> Login</Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
