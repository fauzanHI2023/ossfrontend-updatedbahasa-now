  interface FormDataPersonal {
    user_name: string;
    full_name: string;
    email: string;
    phone_no: string;
    passwd: string;
  }
  
  interface FormDataCompany {
    user_name: string;
    full_name: string;
    email: string;
    passwd: string;
  }

  interface FormVerifyAccount {
    activkey: any;
  }
  
  export async function registerPersonal(formData: FormDataPersonal): Promise<any> {
    try {
      const response = await fetch('https://adminx.human-initiative.org/register-personal/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Username and email already exists');
      }
  
      if (!data.success) {
        throw new Error(data.message || 'Username and email already exists');
      }
  
      return data;
    } catch (error) {
      throw new Error('Username and email already exists');
    }
  }
  
  export async function registerCompany(formData: FormDataCompany): Promise<any> {
    try {
      const response = await fetch('https://adminx.human-initiative.org/register-company/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register company');
      }
  
      if (!data.success) {
        throw new Error(data.message || 'Failed to register company');
      }
  
      return data;
    } catch (error) {
      throw new Error('Username and email already exists');
    }
  }

  export async function checkUsernameEmail(username: string, email: string, phone_no: string): Promise<{ usernameExists: boolean, emailExists: boolean, phoneExists: boolean }> {
    try {
      const response = await fetch(`https://adminx.human-initiative.org/register-personal/check-username-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: username, email, phone_no: phone_no }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to check username and email');
      }
  
      const data = await response.json();
      return {
        usernameExists: data.username_exists,
        emailExists: data.email_exists,
        phoneExists: data.phone_exists,
      };
    } catch (error:any) {
      throw new Error(error.message || 'Failed to check username and email');
    }
  }

  export async function verifyAccount(formData: FormVerifyAccount): Promise<any> {
    try {
      const response = await fetch(`https://adminx.human-initiative.org/register-personal/verify-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification Code Does Not Match');
      }
      
      if(!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error('Invalid Verification Code');
    }  
  }

  export async function resendCode(formData: { email: string }): Promise<any> {
    try {
      const response = await fetch('https://adminx.human-initiative.org/register-personal/resend-code-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      if (!data.success) {
        throw new Error(data.message );
      }
  
      return data;
    } catch (error) {
      throw new Error('Invalid Send Verification');
    }
  }
  
  