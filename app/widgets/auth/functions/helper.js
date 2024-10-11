import { arrayUnion, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getDocIdSByValueSearch,
  handleAddDocToSubCollection,
} from '@/firebase/helperFunctions';

export const handleCreateNewUser = async (
  email,
  password,
  confirmPassword,
  userRole,
  coordsInFocus,
  firebaseContext,
  setAlert
) => {
  if (password !== confirmPassword) {
    setAlert({
      open: true,
      message: 'Passwords do not match',
      type: 'error',
    });
    return;
  }
  if (!email || !password) {
    setAlert({
      open: true,
      message: 'fill in email and password',
      type: 'error',
    });
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then(async function (userCredential) {
        var user = userCredential.user;
        createUser(user, userRole, email, coordsInFocus, firebaseContext);

        user.reload();

        sendEmailVerification(user);
        setAlert({
          open: true,
          message: `please check your mails`,
          type: 'success',
        });
        // sendSignInLinkToEmail(user);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        //    console.log(errorCode, errorMessage);
      });

    setAlert({
      open: true,
      message: `sign up successfull. Welcome ${userCredential.user.email}`,
      type: 'success',
    });
    // handleClose();
    return userCredential;
  } catch (error) {
    //    console.log(error);
    // setAlert({
    //   open: true,
    //   message: error.message,
    //   type: "error",
    // });
    return;
  }
};

export const createUser = async (
  user,
  userRole,
  email,
  coordsInFocus,
  firebaseContext
) => {
  const data = {
    basics: {
      userRole: userRole,
      userMail: email,
    },
    firestoreUserId: user.uid,
    userId: uuidv4(),
    createdAt: new Date(),
    coords: coordsInFocus,
  };

  const newRef = doc(collection(db, firebaseContext));
  await setDoc(newRef, data);

  const newUserNotifictationMail = {
    to: 'anthony.zornig@gmx.de',
    message: {
      subject: 'Anue Backend',
      html: `Hallo lieber Marvin, dies ist eine automatische Mail, dass sich ${email} angemeldet hat. Grüße, Nino`,
    },
  };

  const newUserNotificationRef = doc(collection(db, 'newUserNotification'));
  await setDoc(newUserNotificationRef, newUserNotifictationMail);
};
export const handleLogIn = async (
  e,
  auth,
  email,
  password,
  setUser,
  setUserInFocus,
  setAlert,
  setError
) => {
  if (!email || !password) {
    // setAlert({
    //   open: true,
    //   message: 'fill in email and password',
    //   type: 'error',
    // });
    setAlert({
      note: 'fill in email and password',
      state: 'error',
    });
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user.emailVerified) {
      setUser(userCredential.user);

      //* Set Log of login Time
      const data = {
        logsFrontEnd: arrayUnion({
          logIn: new Date().getTime(),
          logIn2: new Date(),
          logId: uuidv4(),
        }),
      };

      const parentCollectionName = 'users';
      const subCollectionName = 'logs';
      const queryField = 'userId';
      const searchString = userCredential.user.uid;
      const setItemInFocus = setLog;
      const foundParents = users;
      const parentDoc = await getDocIdSByValueSearch(
        parentCollectionName,
        queryField,
        searchString,
        foundParents
      );
      // console.log("parentCollectionName", parentDoc.parentDoc);
      // users.push(parentDoc.parentDoc);

      if (parentDoc.parentId)
        handleAddDocToSubCollection(
          parentCollectionName,
          parentDoc.parentId,
          subCollectionName,
          data,
          setItemInFocus,
          setError
        );
      setUserInFocus(parentDoc?.parentDoc);

      // setAlert({
      //   open: true,
      //   message: `welcome ${userCredential.user.email}`,
      //   type: 'success',
      // });
      setAlert({
        note: `welcome ${userCredential.user.email}`,
        state: 'success',
      });
    } else {
      // setAlert({
      //   open: true,
      //   message: `please check your emails before proceeding`,
      //   type: 'success',
      // });
      setAlert({
        note: `please check your emails before proceeding`,
        state: 'success',
      });
    }
    // window.localStorage.setItem(JSON.stringify("userLogin", userCredential));
    // localStorage.clear();
    // window.localStorage.clear();
  } catch (error) {
    setError(error);
    // setAlert({
    //   open: true,
    //   message: error.message,
    //   type: "error",
    // });
    return;
  }
};
