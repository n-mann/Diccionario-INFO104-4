import Link from "next/link";

const Index = () => {
  return (
    <div>
      <h1>H1</h1>
      <p>
        <b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. Maecenas
        placerat massa nec sapien aliquam porttitor. Morbi interdum mauris sed
        tortor cursus, vel fringilla nibh dignissim. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed nec elit id arcu dignissim suscipit sit
        amet non ipsum. Nam molestie, justo sit amet fringilla venenatis, lorem
        mi vulputate risus, sit amet molestie magna odio nec odio. Ut dignissim
        gravida suscipit.
      </p>
      <img className="eye" src="/eye.png" alt="Eye" />
      <p>
        <Link href="/input">
          <a>Go to /input</a>
        </Link>
      </p>
    </div>
  );
};

export default Index;
