
import { getSession } from "next-auth/react";
import Image from "next/image";
import BackannerImage from "../../../assets/images/backtoschool.png"
import TestBanner from "../../../assets/images/test.png"
export default function RecipeReviewCard() {

  const myLoader = ({ src }) => {
    return src;
  }

  return (
    <div class="show_data">
      <div class="banner">
        <figure><Image src={BackannerImage} alt="back-banner" width="100%" height="100%" layout="responsive" objectFit="contain" /></figure>
      </div>

      <div class="test_sec d-flex">
        <div class="test_cont">
          <h2>Test Performance</h2>
          <figure><Image src={TestBanner} alt="test" /></figure>
        </div>

        <div class="test_cont">
          <h2>Subscriptions</h2>
          <ul>
            <li><span>Course Name :</span> Development (Basic)</li>
            <li><span>Course Id :</span> SR78675674</li>
            <li><span>Course Fee :</span> Rs 1500</li>
            <li><span>Course Duration :</span> 6 Month</li>
            <li><span>Modules :</span> HTML,CSS,Javascript(basic) 3 month
              <p> DBMS 15 days</p>
              <p>PHP (3month) + Live Project (3 month)</p>
            </li>

          </ul>
          <div class="show_btn">
            <a href="#" class="def_btnt">Show More</a>
          </div>
        </div>


      </div>
    </div>
  );
}
export async function getServerSideProps(context) {

  const user = await getSession(context)
  if (!user) {
    return {
      redirect: {
        destination: "/login",
      },
    }
  }
  if (user?.user?.role === "admin") {
    return {
      redirect: {
        destination: "/admin/student",
      },
    }
  } else if (user?.user?.role === "partner") {
    return {
      redirect: {
        destination: "/partner",
      },
    }
  }
  return {
    props: {
      user: user ? user.user : ""
    }
  }
}