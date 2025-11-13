import { useEffect } from "react";
import { getToken, getUserId, getUserRole } from "~/components/getLocalStorage";
import { getUser } from "~/redux/features/auth/userSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";

const User = () => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const { loading, data } = useAppSelector((state) => state.user);
  const userId = getUserId();
  const userRole = getUserRole();

  useEffect(() => {
    if (userId && token) {
      dispatch(getUser({ userId, token }));
    }
  }, [userId]);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-white">
          User Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-400">
          Personal details.
        </p>
      </div>
      <div className="mt-6 border-t border-white/10">
        <dl className="divide-y divide-white/10">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-100">Full name</dt>
            <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {data?.result?.userName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-100">User Role</dt>
            <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {userRole}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-100">
              Email address
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {data?.result?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-100">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {data?.result?.phoneNumber}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default User;
