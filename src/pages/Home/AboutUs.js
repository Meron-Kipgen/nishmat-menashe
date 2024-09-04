import React from "react";
import styled from "styled-components";

const AboutContainer = styled.section`
  padding: 50px 20px;
  background-color: #fff;
  text-align: center;
  color: #333;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }

  @media (max-width: 480px) {
    padding: 30px 10px;
  }
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const AboutTitle = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 480px) {
    font-size: 1.75em;
  }
`;

const AboutSubtitle = styled.h3`
  font-size: 1.75em;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }

  @media (max-width: 480px) {
    font-size: 1.25em;
  }
`;

const AboutText = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

const Hebrew = styled.p`
  direction: rtl;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.3rem;
`;

function AboutUs() {
  return (
    <AboutContainer>
      <AboutContent>
        <AboutTitle>About Us</AboutTitle>
        <AboutSubtitle>Spreading Torah Through Every Medium</AboutSubtitle>
        <AboutText>
          We are a dedicated team, proudly sponsored by Yeshivat Hesder Maalot,
          with a singular mission: to bring the timeless wisdom of Torah to as
          many people as possible, using every form of media available. Our aim
          is to make Torah learning accessible and engaging, whether you prefer
          reading, watching, or listening.
        </AboutText>
        <AboutText>
          Yeshivat Hesder Maalot, a leading institution in Torah study and
          religious Zionism, supports our initiative to expand Torah learning
          beyond traditional classrooms. We believe that the teachings of Torah
          are not just meant to be studied; they are meant to be lived, shared,
          and experienced by all.
        </AboutText>
        <AboutText>
          To achieve this, we utilize a variety of platforms to reach our
          audience, ensuring that the beauty and depth of Torah are available in
          formats that resonate with modern learners. Our offerings include:
        </AboutText>
        <AboutText>
          <strong>Magazines:</strong> Thoughtfully curated articles that delve into
          Torah insights, Jewish philosophy, Halacha, and contemporary issues from a
          Torah perspective. Our magazines are designed to provide in-depth learning
          in a format that is both accessible and enlightening.
        </AboutText>
        <AboutText>
          <strong>Website:</strong> A comprehensive online platform where you can find
          articles, commentaries, and Torah resources. Our website serves as a hub for
          Torah study, offering a wealth of knowledge at your fingertips, whether you
          are a beginner or an advanced learner.
        </AboutText>
        <AboutText>
          <strong>Video Content:</strong> Engaging video lectures, classes, and discussions
          led by renowned Torah scholars. These videos allow you to experience Torah
          learning in a dynamic and interactive way, bringing the teachings to life
          through visuals and expert explanations.
        </AboutText>
        <AboutText>
          <strong>Audio:</strong> For those who prefer learning on the go, our audio
          content includes podcasts, shiurim, and discussions that you can listen to
          anytime, anywhere. This format ensures that Torah learning can be a part of
          your daily routine, whether you are commuting, exercising, or relaxing at home.
        </AboutText>
        <AboutText>
          Our goal is to make the profound teachings of the Torah accessible to everyone,
          regardless of where you are or how you prefer to learn. We are committed to
          innovation in Torah education, continually exploring new ways to bring the light
          of Torah into the lives of people around the world.
        </AboutText>
        <AboutText>
          Through the generous support of Yeshivat Hesder Maalot, we are empowered to
          continue our mission, ensuring that the Torah’s wisdom reaches every corner of
          the globe, inspiring individuals and communities alike. Together, we can create
          a world where Torah learning is not just a tradition, but a vibrant and integral
          part of daily life.
        </AboutText>
        <Hebrew>
          אודותינו: הפצת התורה בכל אמצעי<br/><br/>
          אנחנו צוות מסור, בחסות ישיבת הסדר מעלות, עם מטרה אחת:<br/>
          להביא את חכמת התורה הנצחית לכמה שיותר אנשים, תוך שימוש<br/>
          בכל אמצעי המדיה הזמין. המטרה שלנו היא להפוך את לימוד התורה לנגיש<br/>
          ומרתק, בין אם אתם מעדיפים לקרוא, לצפות או להאזין.<br/><br/>
          ישיבת הסדר מעלות, מוסד מוביל בלימוד תורה ובציונות הדתית,<br/>
          תומכת ביוזמה שלנו להרחיב את לימוד התורה מעבר לכיתות המסורתיות.<br/>
          אנו מאמינים שתורת ישראל אינה מיועדת רק ללמידה, אלא גם לחיים,<br/>
          לשיתוף, ולחוויית הלמידה. לשם כך, אנו משתמשים במגוון פלטפורמות<br/>
          כדי להגיע לקהל שלנו, ולהבטיח שהיופי והעומק של התורה יהיו זמינים<br/>
          בפורמטים המתחברים ללומדים בימינו.<br/><br/>
          ההיצע שלנו כולל:<br/><br/>
          מגזינים: מאמרים שנבחרו בקפידה ומעמיקים בתובנות תורניות, פילוסופיה<br/>
          יהודית, הלכה, ונושאים עכשוויים מנקודת מבט תורנית.<br/>
          המגזינים שלנו נועדו לספק לימוד מעמיק בפורמט נגיש ומאיר עיניים.<br/><br/>
          אתר אינטרנט: פלטפורמה מקיפה מקוונת בה ניתן למצוא מאמרים,<br/>
          פירושים ומשאבי תורה. האתר שלנו משמש כמרכז ללימוד תורה,<br/>
          ומציע עושר של ידע בהישג יד, בין אם אתה מתחיל או לומד מתקדם.<br/><br/>
          תוכן וידאו: הרצאות וידאו מרתקות, שיעורים ודיונים בהובלת<br/>
          רבנים ומרצים ידועים בתורה. הווידאו מאפשר לך לחוות את לימוד התורה<br/>
          בצורה דינמית ואינטראקטיבית, ולהחיות את הלמידה דרך ויזואליות<br/>
          והסברים מקצועיים.<br/><br/>
          תוכן אודיו: לאלו שמעדיפים ללמוד תוך כדי תנועה,<br/>
          התוכן האודיו שלנו כולל פודקאסטים, שיעורים ודיונים<br/>
          שניתן להאזין להם בכל זמן ומקום. פורמט זה מבטיח שלימוד התורה<br/>
          יוכל להיות חלק משגרת היומיום שלך, בין אם אתה בנסיעה,<br/>
          באימון או בזמן מנוחה בבית.<br/><br/>
          המטרה שלנו היא להפוך את תורת ישראל לנגישה לכולם,<br/>
          ללא קשר למקום שבו אתה נמצא או איך שאתה מעדיף ללמוד.<br/>
          אנחנו מחויבים לחדשנות בלימוד התורה, ולחקור כל הזמן<br/>
          דרכים חדשות להביא את אור התורה לחיי אנשים בכל רחבי העולם.<br/><br/>
          בזכות התמיכה הנדיבה של ישיבת הסדר מעלות,<br/>
          אנו ממשיכים במשימתנו, לדאוג שחכמת התורה תגיע לכל פינה בעולם,<br/>
          ותשפיע על יחידים וקהילות כאחד. יחד, אנו יכולים ליצור עולם<br/>
          שבו לימוד התורה הוא לא רק מסורת, אלא חלק חי ומרכזי מחיי היום-יום.<br/>
        </Hebrew>
      </AboutContent>
    </AboutContainer>
  );
}

export default AboutUs;
