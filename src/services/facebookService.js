export const loginWithFacebook = () => {
    return new Promise((resolve, reject) => {
      window.FB.login(
        function (response) {
          if (response.authResponse) {
            console.log("✅ User logged in successfully!")
            
            window.FB.api("/me", { fields: "id,name,email,picture" }, function (userInfo) {
              resolve(userInfo)
            })
          } else {
            reject("User cancelled login or did not authorize.");
          }
        },
        { scope: "public_profile,email" }
      );
    });
  };
  