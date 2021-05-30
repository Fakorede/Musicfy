<template>
  <div 
    class="text-white text-center font-bold p-5 mb-4"
    :class="reg_alert_variant"
    v-if="reg_alert"
  >{{ reg_alert_msg }}</div>
  <vee-form 
    :validation-schema="reg_schema"
    @submit="register" 
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field 
        as="input"
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        as="input"
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" 
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field 
        as="input"
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded" 
        />
        <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password" 
        :bails="false"
        v-slot="{field, errors}"
      >
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password" 
          v-bind="field"
        />
        <div 
          class="text-red-600"
          v-for="error in errors"
          :key="error"  
        >
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field 
        as="input" 
        name="confirm_password" 
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" 
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field 
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
        <option value="Australia">Australia</option>
        <option value="Brazil">Brazil</option>
        <option value="Canada">Canada</option>
        <option value="Denmark">Denmark</option>
        <option value="Estonia">Estonia</option>
        <option value="Finland">Finland</option>
        <option value="Germany">Germany</option>
        <option value="Holland">Holland (Netherlands)</option>
        <option value="Italy">Italy</option>
        <option value="Japan">Japan</option>
        <option value="Kenya">Kenya</option>
        <option value="Louxembourg">Louxembourg</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Poland">Poland</option>
        <option value="Quatar">Quatar</option>
        <option value="Republic of Ireland">Republic of Ireland</option>
        <option value="Spain">Spain</option>
        <option value="Tanzania">Tanzania</option>
        <option value="UK">UK</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zambia">Zambia</option>
        <option value="US">US</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1" 
        type="checkbox" 
        class="w-4 h-4 float-left -ml-6 mt-1 rounded" 
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button 
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700"
      :disabled="reg_submit"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
  export default {
    name: 'RegisterForm',
    data() {
      return {
        reg_schema: {
          name: 'required|min:5|max:25|alpha_spaces',
          email: 'required|email',
          age: 'required|min_value:18|max_value:100',
          password: 'required|min:8',
          confirm_password: 'passwords_mismatch:@password',
          country: 'required|country_excluded:US',
          tos: 'tos',
        },
        userData: {
          country: 'Nigeria',
        },
        reg_submit: false,
        reg_alert: false,
        reg_alert_variant: 'bg-blue-500',
        reg_alert_msg: 'Please wait, your account is being created...',
      }
    },
    methods: {
      register(values) {
        this.reg_alert = true;
        this.reg_submit = true;
        this.reg_alert_variant = 'bg-blue-500';
        this.reg_alert_msg = 'Please wait! Your account is being created...';

        setTimeout(() => {
          this.reg_alert_variant = 'bg-green-500';
          this.reg_alert_msg = 'Success! Your account has been created.';
        }, 3000);

        console.log(values);
      },
    },
  }
</script>
