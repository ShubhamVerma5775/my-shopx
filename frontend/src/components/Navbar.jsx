import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/exports";
import { userLogout } from "../states/actions/userLoginActions";
import shortid from "shortid";

const Navbar = () => {
  const dispatchUserLogout = useDispatch();
  const loginStatus = useSelector((state) => {
    return state.userLoginStatusReducer.isSignedIn;
  });
  const [search, setSearch] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [categories, setCategories] = useState();
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [circleDropdown, setCircleDropdown] = useState(false);
  const [sidenav, setSidenav] = useState(false);
  const [value, setValue] = useState("");
  const [product, setProduct] = useState();
  const [user, setUser] = useState();

  const [avatar, setAvatar] = useState();
  const searchClick = () => {
    setSearch((prev) => {
      return !prev;
    });
  };
  const categroryDropdownClick = () => {
    setCategoryDropdown((prev) => {
      return !prev;
    });
  };
  const circleDropdownClick = () => {
    setCircleDropdown((prev) => {
      return !prev;
    });
  };
  const sideNavClick = () => {
    setSidenav((prev) => {
      return !prev;
    });
  };

  const userInfo = useSelector((state) => { return state.userLoginStatusReducer.user });

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo])

  const fetchProductData = async (req, res) => {
    const response = await fetch(
      "/admin/getAllProductNames"
    );
    const data = await response.json();
    setProduct(data.products);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const logoutClickHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 200) {
        dispatchUserLogout(userLogout());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        "/admin/getAllCategoryNames"
      );
      const data = await response.json();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleChange = (e) => {
    setDropDown(true);
    setValue(e.target.value);
  };

  const handleDropdown = () => {
    setDropDown(false);
  };

  // const dispatch = useDispatch();
  return (
    <div className="flex justify-between p-3 shadow-lg">
      {/* This is for logo */}
      <div className="logo self-center ml-8 mdm:ml-3">
        <Link to="/">
          <img
            src={
              "https://res.cloudinary.com/dysuxhyd3/image/upload/v1666791864/combpro/images/logo_kwd8c3.webp"
            }
            alt="logo"
            className="h-7 smm:h-7 smm:w-20"
          />
        </Link>
      </div>

      {/* This is for navbar options */}
      {/* More adjust it when we add login functionality */}
      <div className="options self-center mt-0 mdm:hidden">
        <ul className="flex space-x-10 px-5 py-2 lgm:space-x-6">
          <li className="transition duration-200 font-semibold hover:text-red-600 hover:cursor-pointer hover:scale-110">
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <div
              onClick={categroryDropdownClick}
              className="transition duration-200 font-semibold hover:text-red-600 hover:cursor-pointer hover:scale-110"
            >
              Categories
              <svg
                width="6"
                height="3"
                className="ml-2 overflow-visible inline"
                aria-hidden="true"
              >
                <path
                  d="M0 0L3 3L6 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
            {/* Dropdown menu */}
            <div
              className={
                categoryDropdown
                  ? "absolute z-10 mt-5 bg-red-400 w-48 rounded"
                  : "hidden"
              }
              onMouseEnter={() => setCategoryDropdown(true)}
              onMouseLeave={() => setCategoryDropdown(false)}
            >
              {categories && (
                <>
                  <ul className="space-y-2">
                    {categories.category.map((category, index) => {
                      return (
                        <Link
                          key={shortid.generate()}
                          to={`/products/${category._id}`}
                        >
                          <li
                            className=" p-1 px-3 py-2 hover:bg-red-300 cursor-pointer"
                            key={shortid.generate()}
                          >
                            {category.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </li>
          {loginStatus === "true" ? (
            <>
              <li
                onClick={logoutClickHandler}
                className="transition duration-200 font-semibold hover:text-red-600 hover:cursor-pointer hover:scale-110"
              >
                <Link to="/signin">Logout</Link>
              </li>
              <li className="transition duration-200 font-semibold hover:text-red-600 hover:cursor-pointer hover:scale-110">
                <Link to="/myprofile">My Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li className="transition duration-200 font-semibold hover:text-red-600 hover:cursor-pointer hover:scale-110">
                <Link to={"/signup"}>SignUp</Link>
              </li>
              <li className="transition duration-200 font-semibold hover:text-red-600 hover:cursor-pointer hover:scale-110">
                <Link to={"/signin"}>SignIn</Link>
              </li>
            </>
          )}

          <li className="transition duration-200 font-semibold hover:text-red-600 hover:cursor-pointer hover:scale-110">
            <Link to="/contact"> Contact</Link>
          </li>
          <li>
            <input
              type="text"
              name="value"
              className={
                search
                  ? "transition duration-700 border rounded-lg px-2 border-black lgm:w-24"
                  : "w-0"
              }
              placeholder="Search"
              onChange={handleChange}
            />
            {dropdown && product && value && (
              <div
                className="dropdown p-2 shadow-xl mt-2 absolute z-10 bg-white w-72 rounded-md"
                onMouseOver={() => setDropDown(true)}
                onMouseOut={handleDropdown}
              >
                <div className="items cursor-pointer">
                  {product
                    .filter((item) => {
                      let searchTerm = value.toLowerCase();
                      let fullName = item.name.toLowerCase();

                      return (
                        searchTerm &&
                        fullName.includes(searchTerm) &&
                        fullName !== searchTerm
                      );
                    })
                    .slice(0, 7)
                    .map((item, i) => (
                      <Link
                        key={shortid.generate()}
                        to={`/product/${item._id}`}
                      >
                        <div
                          key={shortid.generate()}
                          className={
                            "item flex items-center justify-between p-1 border-b-2 hover:bg-gray-100 rounded-sm duration-100"
                          }
                        >
                          <h1 className="text-lg smm:text-sm">{item.name}</h1>
                          <img
                            loading="lazy"
                            className="h-10 w-10"
                            src={item.productImage}
                            alt="product"
                          />
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </li>
          <li
            className="transition duration-200 my-1 hover:text-red-600 hover:cursor-pointer hover:scale-110"
            onClick={searchClick}
          >
            <BsSearch />
          </li>
          <li className="my-1">
            <Link to="/checkout">
              <Cart />
            </Link>
          </li>
        </ul>
      </div>

      {/* Hidden info which shows itself after login */}
      <div className="info self-center md:hidden">
        <div className="flex mdm:space-x-6">
          <div
            onClick={sideNavClick}
            className="space-y-1 py-2.5 w-5 cursor-pointer md:hidden"
          >
            <div className="p-0.5 bg-slate-500"></div>
            <div className="p-0.5 bg-slate-500"></div>
            <div className="p-0.5 bg-slate-500"></div>
          </div>
          <div className="flex items-center mb-4 ">
            <Link to="/checkout">
              <Cart />
            </Link>
          </div>

          <div className="">
            <div onClick={circleDropdownClick} className="img cursor-pointer">
              <img
                className=" rounded-full h-10 w-10"
                src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                alt="img"
                loading="lazy"
              />
            </div>
            <div
              className={
                circleDropdown
                  ? "absolute z-20 mt-2 -ml-40 bg-red-400 w-48 rounded"
                  : "hidden"
              }
            >
              <ul className="space-y-2">
                {loginStatus === "true" ? (
                  <>
                    <Link to="/myprofile">
                      <li className=" p-1 px-3 py-2 hover:bg-red-300 cursor-pointer" onClick={circleDropdownClick}>
                        My Profile
                      </li>
                    </Link>
                    <Link to="/signin">
                      <li
                        onClick={logoutClickHandler}
                        className=" p-1 px-3 py-2 hover:bg-red-300 cursor-pointer"
                      >
                        Logout
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signin">
                      <li className=" p-1 px-3 py-2 hover:bg-red-300 cursor-pointer" onClick={circleDropdownClick}>
                        Sign In
                      </li>
                    </Link>
                    <Link to="/signup">
                      <li className=" p-1 px-3 py-2 hover:bg-red-300 cursor-pointer" onClick={circleDropdownClick}>
                        Sign Up
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          sidenav
            ? "absolute z-10 h-full w-3/4 bg-slate-200 -m-3 animate-fade-in transition duration-100"
            : "hidden"
        }
      >
        <div className="float-right p-5 w-full block">
          <h1 className="float-right cursor-pointer" onClick={sideNavClick}>
            ❌
          </h1>
        </div>
        <div className="block mt-20">
          <ul className="">
            <Link to="/">
              <li className="hover:bg-red-400 p-5 cursor-pointer" onClick={sideNavClick}>Home</li>
            </Link>
            <Link to="/contact">
              <li className="hover:bg-red-400 p-5 cursor-pointer" onClick={sideNavClick}>Contact</li>
            </Link>
            <li
              className="hover:bg-red-400 p-5 cursor-pointer"
              onClick={categroryDropdownClick}
            >
              Categories
            </li>
            {categoryDropdown ? (
              categories && (
                <>
                  <ul className="space-y-2">
                    {categories.category.map((category, index) => {
                      return (
                        <Link
                          key={shortid.generate()}
                          to={`/products/${category._id}`}
                          onClick={sideNavClick}
                        >
                          <li
                            className=" p-1 px-8 py-2 hover:bg-red-300 cursor-pointer"
                            key={shortid.generate()}
                            
                          >
                            {category.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </>
              )
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
