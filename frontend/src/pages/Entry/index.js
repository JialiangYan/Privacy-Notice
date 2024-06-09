import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import transition from '../../animation/transition'
import 'react-toastify/dist/ReactToastify.css'

import styles from './index.module.css'

function Entry() {
  const navigate = useNavigate()

  // read parameters
  const [searchParams] = useSearchParams()
  const prolificPid = searchParams.get('PROLIFIC_PID')

  // track participant info
  useEffect(() => {
    if (!prolificPid) {
      navigate('/error')
    }
  }, [prolificPid, navigate])

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/instruct', { state: { prolificPid } })
  }

  return (
    <div className={styles.main}>
      <div className={styles.title1}>Welcome to our user study! </div>
      {/* Consent Content */}
      <div className={styles.content}>
        <div className={styles.title2}>Contact Information</div>
        <p>
          Supervisor: Bailey Kacsmar <br /> kacsmar@ualberta.ca
        </p>
        <p>
          Research Assistant: Jialiang Yan <br /> jialian6@ualberta.ca
        </p>
        <p>
          The purpose of this study is to improve the user experience from app
          installation to app usage process. To do this, you will perform a
          simulated app installation and usage task in the our web app and then
          answer a questionnaire. All these activities will take place in your
          browser.
        </p>
        <p>
          You must meet the following criteria to participate in this study:
        </p>
        <ul className={styles.lst}>
          <li>Between the ages of 18 and 65</li>
          <li>English speaking</li>
          <li>Within North America</li>
          <li>iPhone user</li>
        </ul>
        <p>Your participation should take around 30 minutes.</p>
        <div className={styles.title2}>Benefits</div>
        <p>
          Other than the receipt of a small honorarium, you will not directly
          benefit from your participation. Information gathered in this research
          will help us improve existing smartphone user experience and develop
          new interaction design that could benefit users.
        </p>
        <div className={styles.title2}>Risk</div>
        <p>
          While it is always possible that someone can figure out who
          participated in a study, we will remove all identifying information
          from your data before analyzing it in order to make it harder for
          people to tell who has participated.
        </p>
        <p>
          There are no other foreseeable risks. If at any time, we become aware
          of additional risks, we will postpone the study and notify you
          immediately so that these risks can be minimized before we continue
          with research activities. If it is necessary, we will stop the study
          altogether.
        </p>
        <div className={styles.title2}>Remuneration/Compensation</div>
        <p>
          To thank you for your time, you will be eligible to receive $9 after
          completing the study. Besides, we will be pleased to make a summary of
          the results available to you once they have been compiled.
        </p>
        <div className={styles.title2}>Confidentiality & Anonymity</div>
        <p>
          No one will be identified in this study and identifying personal
          information will be removed. Reports and publications detailing the
          results of this research will describe aggregate data. Where quotes
          are included, we will take care to select quotes that will not
          identify the speaker.
        </p>
        <p>
          All data and documents will be securely kept for a period of at least
          5 years after we have finished our research activities. Data may be
          kept for even longer. If we decide not to keep it after 5 years, it
          will be destroyed.
        </p>
        <div className={styles.title2}>
          Voluntary Participation & Freedom to Withdraw
        </div>
        <p>
          You get to choose whether you want to complete study activities. It is
          okay if you don't want us to use your data. We can always exclude your
          data while analyzing that of others.
        </p>
        <p>
          You may withdraw at any time. To withdraw, exit our study website and
          we will destroy any of the data that we have collected from you.
        </p>
        <p>
          If you do not participate in this study or choose to withdraw from
          this study, the data that was collected during your participation will
          be destroyed.
        </p>
        <p>
          Note that you cannot have your data removed if you have already
          completed this study.
        </p>
        <div className={styles.title2}>Further Information</div>
        <p>
          Please contact Bailey, by email at <a href="">kacsmar@ualberta.ca</a>{' '}
          , or Jialiang, by email at <a href="">jialian6@ualberta.ca</a>, if you
          would like to know more. They are both happy to answer questions about
          this study and what we are doing. Please contact either of them if you
          have any questions or concerns.
        </p>
        <p>
          The plan for this study has been reviewed by a Research Ethics Board
          at the University of Alberta (Pro00142737). If you have any questions
          regarding your rights as a research participant, you may contact the
          University of Alberta Research Ethics Office at{' '}
          <a href="">reoffice@ualberta.ca</a>
          or 780-492-2615 and quote Ethics ID Pro00142737. This office is
          independent of the study investigators.
        </p>
      </div>
      {/* Form */}
      <hr />
      <div className={styles.form}>
        <p>
          I have read this form. I have been told whom to contact if I have
          questions, and I am able to print a copy of this consent form for
          myself. I agree to participate in the research study described above
          (You can use my data).
        </p>
        <form onSubmit={handleSubmit}>
          <button type="submit" className={styles.btn}>
            Consent
          </button>
        </form>
      </div>
    </div>
  )
}

export default transition(Entry)
