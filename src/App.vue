<template>
  <div id="app">
    <h1>Создание учётной записи медицинского клиента</h1>
    <form ref="form" @submit.prevent="createUser" novalidate>

      <div class="stage" v-show="stage === 1">

        <h2>Основные данные</h2>

        <div class="form-group">
          <label for="surname">Ваша фамилия<span class="warn">*</span></label>
          <input @blur="$v.formData.surname.$touch()"
                  :class="checkStatus(this.$v.formData.surname)"
                  v-model.trim="formData.surname" type="text" maxlength="30" name="surname" id="surname" autocomplete="off" />

          <div v-if="$v.formData.surname.$error && !$v.formData.surname.required" class="invalid-warning">
            {{ messageRequired }}
          </div>

          <div v-if="!$v.formData.surname.alpha" class="invalid-warning">
            {{ messageAlpha }}
          </div>

        </div>

        <div class="form-group">
          <label for="name">Ваше имя<span class="warn">*</span></label>
          <input @blur="$v.formData.name.$touch()"
                  :class="checkStatus(this.$v.formData.name)"
                  v-model.trim="formData.name" type="text" maxlength="30" name="name" id="name" autocomplete="off" />

          <div v-if="$v.formData.name.$error && !$v.formData.name.required" class="invalid-warning">
            {{ messageRequired }}
          </div>

          <div v-if="!$v.formData.name.alpha" class="invalid-warning">
            {{ messageAlpha }}
          </div>

        </div>

        <div class="form-group">
          <label for="patronymic">Ваше отчество</label>
          <input @blur="$v.formData.patronymic.$touch()"
                  :class="checkStatus(this.$v.formData.patronymic)"
                  v-model.trim="formData.patronymic" type="text" maxlength="30" name="patronymic" id="patronymic" autocomplete="off" />
        </div>

        <div v-if="!$v.formData.patronymic.alpha" class="invalid-warning">
          {{ messageAlpha }}
        </div>

        <div class="form-group">
          <label for="birth_date">Дата рождения<span class="warn">*</span></label>
          <input @blur="$v.formData.birth_date.$touch()"
                  :class="checkStatus(this.$v.formData.birth_date)"
                  v-model="formData.birth_date" type="date" name="birth_date" id="birth_date" />

          <div v-if="$v.formData.birth_date.$error && !$v.formData.birth_date.$required" class="invalid-warning">
            {{ messageRequired }}
          </div>

        </div>

        <div class="form-group">
          <label for="phone">Номер телефона<span class="warn">*</span></label>
          <input v-mask="'+7 (###) ###-##-##'"
                  @blur="$v.formData.phone.$touch()"
                  :class="checkStatus(this.$v.formData.phone)"
                  v-model="formData.phone" type="tel" name="phone" id="phone" autocomplete="off" />

          <div v-if="$v.formData.phone.$error && !$v.formData.phone.$required" class="invalid-warning">
            {{ messageRequired }}
          </div>

        </div>

        <div class="form-group">
          <label for="sex">Пол</label>
          <select v-model="formData.sex" name="sex" id="sex">
            <option disabled></option>
            <option value="male">мужской</option>
            <option value="female">женский</option>
          </select>
        </div>

        <div class="form-group">
          <label for="clients">Группа клиентов<span class="warn">*</span></label>
          <select @blur="$v.formData.clients.$touch()"
                    :class="checkStatus(this.$v.formData.clients)"
                    v-model="formData.clients" name="clients" id="clients" multiple>
            <option v-for="(option, index) in options" :key="index"> {{ option }} </option>
          </select>
          <div class="elems">Выбранные группы: {{ formData.clients }}</div>

          <div v-if="$v.formData.clients.$error && !$v.formData.clients.$required" class="invalid-warning">
            {{ messageRequired }}
          </div>
        </div>

        <div class="form-group">
          <label for="doctor">Лечащий врач</label>
          <select v-model="formData.doctor" name="doctor" id="doctor">
            <option disabled></option>
            <option value="Ivanov">Иванов</option>
            <option value="Zakharov">Захаров</option>
            <option value="Chernisheva">Чернышева</option>
          </select>
        </div>

        <div class="form-checkbox">
          <input type="checkbox" id="checkbox">
          <label for="checkbox">Не отправлять СМС</label>
        </div>

        <div class="message"><p><span class="warn">*</span> - Поля, обязательные для заполнения</p></div>

        <button @click="nextStage"
                :disabled="buttonDisableStage1"
                type="button" class="next">Далее
        </button>
      </div>

      <transition name="slide-fade">
        <div class="stage" v-show="stage === 2">
          <h2>Адрес проживания</h2>
          <div class="form-group">
            <label for="index">Индекс</label>
            <input v-mask="'######'"
                    @blur="$v.formData.index.$touch()"
                    :class="checkStatus(this.$v.formData.index)"
                    v-model="formData.index" type="text" name="index" id="index" autocomplete="off" />
          </div>

          <div class="form-group">
            <label for="country">Страна</label>
            <input @blur="$v.formData.country.$touch()"
                    :class="checkStatus(this.$v.formData.country)"
                    v-model.trim="formData.country" type="text" maxlength="20" name="country" id="country" autocomplete="off" />
          </div>

          <div v-if="!$v.formData.country.alpha" class="invalid-warning">
            {{ messageAlpha }}
          </div>

          <div class="form-group">
            <label for="region">Область</label>
            <input @blur="$v.formData.region.$touch()"
                    :class="checkStatus(this.$v.formData.region)"
                    v-model.trim="formData.region" type="text" maxlength="20" name="region" id="region" autocomplete="off" />
          </div>

          <div v-if="!$v.formData.region.alpha" class="invalid-warning">
            {{ messageAlpha }}
          </div>

          <div class="form-group">
            <label for="city">Город<span class="warn">*</span></label>
            <input @blur="$v.formData.city.$touch()"
                    :class="checkStatus(this.$v.formData.city)"
                    v-model.trim="formData.city" type="text" name="city" id="city" autocomplete="off" />

          <div v-if="$v.formData.city.$error && !$v.formData.city.required" class="invalid-warning">
            {{ messageRequired }}
          </div>

          <div v-if="!$v.formData.city.alpha" class="invalid-warning">
            {{ messageAlpha }}
          </div>

          </div>

          <div class="form-group">
            <label for="street">Улица</label>
            <input @blur="$v.formData.street.$touch()"
                    :class="checkStatus(this.$v.formData.street)"
                    v-model.trim="formData.street" type="text" maxlength="20" name="street" id="street" autocomplete="off" />
          </div>

          <div v-if="!$v.formData.street.alpha" class="invalid-warning">
            {{ messageAlpha }}
          </div>

          <div class="form-group">
            <label for="home">Дом</label>
            <input @blur="$v.formData.home.$touch()"
                    :class="checkStatus(this.$v.formData.home)"
                    v-model.trim="formData.home" type="text" maxlength="4" name="home" id="home" autocomplete="off" />
          </div>

          <div v-if="!$v.formData.home.numeric" class="invalid-warning">
              {{ messageNumeric }}
          </div>

          <div class="message"><p><span class="warn">*</span> - Поля, обязательные для заполнения</p></div>

          <button @click="prevStage" type="button" class="prev">Назад</button>
          <button  @click="nextStage"
                    :disabled="buttonDisableStage2"
                    type="button" class="next">Далее</button>
        </div>
      </transition>

      <transition name="slide-fade">
        <div class="stage" v-show="stage === 3">
          <h2>Документ, удостоверяющий личность</h2>

          <div class="form-group">
            <label for="type">Тип документа<span class="warn">*</span></label>
            <select @blur="$v.formData.type.$touch()"
                      :class="checkStatus(this.$v.formData.type)"
                      v-model="formData.type" name="type" id="type">
              <option disabled></option>
              <option value="passport">Паспорт</option>
              <option value="certificate">Свидетельство о рождении</option>
              <option value="license">Водительское удостоверение</option>
            </select>

            <div v-if="$v.formData.type.$error && !$v.formData.type.$required" class="invalid-warning">
              {{ messageRequired }}
            </div>

          </div>

          <div class="form-group">
            <label for="series">Серия</label>
            <input v-mask="'######'"
                  v-model="formData.series" type="text" name="series" id="series" autocomplete="off" />
          </div>

          <div class="form-group">
            <label for="pass_num">Номер</label>
            <input v-mask="'## ##'"
                  v-model="formData.pass_num" type="text" name="pass_num" id="pass_num" autocomplete="off" />
          </div>

          <div class="form-group">
            <label for="who_issued">Кем выдан</label>
            <input v-model.trim="formData.who_issued" type="text" maxlength="50" name="who_issued" id="who_issued" autocomplete="off" />
          </div>

          <div class="form-group">
            <label for="date_extradition">Дата выдачи<span class="warn">*</span></label>
            <input @blur="$v.formData.date_extradition.$touch()"
                    :class="checkStatus(this.$v.formData.date_extradition)"
                    v-model="formData.date_extradition" type="date" name="date_extradition" id="date_extradition" />

            <div v-if="$v.formData.date_extradition.$error && !$v.formData.date_extradition.$required" class="invalid-warning">
              {{ messageRequired }}
            </div>

          </div>

          <div class="message"><p><span class="warn">*</span> - Поля, обязательные для заполнения</p></div>

          <button @click="prevStage" type="button" class="prev">Назад</button>
          <button
                  :disabled="registrationDisable"
                  type="submit" class="submit">Зарегистрироваться</button>

                  <div v-if="registrationDisable" class="invalid-warning">
                    <p>Заполните все обязательные поля и проверьте введённые данные</p>
                  </div>
        </div>
      </transition>

  </form>
</div>
</template>

<script>
import { required, helpers, numeric } from 'vuelidate/lib/validators'

const alpha = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)

export default {
  data () {
    return {
      stage: 1,
      messageRequired: 'Поле обязательно для заполнения',
      messageAlpha: 'В поле могут содержаться только буквы',
      messageNumeric: 'В поле могут содержаться только цифры',
      options: ['VIP', 'Проблемные', 'ОМС'],
      formData: {
        surname: '',
        name: '',
        patronymic: '',
        birth_date: '',
        phone: '',
        sex: '',
        clients: [],
        doctor: '',
        no_send: '',
        index: '',
        country: '',
        region: '',
        city: '',
        street: '',
        home: '',
        type: '',
        series: '',
        pass_num: '',
        who_issued: '',
        date_extradition: ''
      }
    }
  },
  computed: {
    buttonDisableStage1 () {
      return this.$v.formData.surname.$invalid ||
              this.$v.formData.name.$invalid ||
              this.$v.formData.birth_date.$invalid ||
              this.$v.formData.phone.$invalid ||
              this.$v.formData.clients.$invalid
    },
    buttonDisableStage2 () {
      return this.$v.formData.city.$invalid
    },
    registrationDisable () {
      return this.$v.formData.type.$invalid ||
              this.$v.formData.date_extradition.$invalid ||
              !this.$v.formData.patronymic.alpha ||
              !this.$v.formData.country.alpha ||
              !this.$v.formData.region.alpha ||
              !this.$v.formData.street.alpha ||
              !this.$v.formData.home.numeric
    }
  },
  methods: {
    checkStatus (validator) {
      // eslint-disable-next-line
      return { 'invalid': validator.$error }
    },
    nextStage () {
      if (this.stage < 3) this.stage++
    },

    prevStage () {
      if (this.stage > 1) this.stage--
    },

    createUser () {
      alert('Клиент успешно зарегистрирован!')
      this.stage = 1
      this.$refs.form.reset()
      this.$v.$reset()
    }
  },

  validations: {
    formData: {
      surname: {
        required,
        alpha
      },
      name: {
        required,
        alpha
      },
      patronymic: {
        alpha
      },
      birth_date: {
        required
      },
      phone: {
        required
      },
      clients: {
        required
      },
      city: {
        required,
        alpha
      },
      index: {
        numeric
      },
      country: {
        alpha
      },
      region: {
        alpha
      },
      street: {
        alpha
      },
      home: {
        numeric
      },
      type: {
        required
      },
      series: {
        numeric
      },
      pass_num: {
        numeric
      },
      date_extradition: {
        required
      }
    }
  }
}
</script>

<style lang="sass">

$warning-bg: rgb(255 6 6 / 42%)
$warning-red: #fd0000

@mixin flex-column
  display: flex
  flex-direction: column

#app
  @include flex-column
  justify-content: center
  align-items: center
  gap: 4em
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif

  h1
    text-align: center
    margin-top: 2em

  form
    max-width: 80vw
    background-color: rgba(255, 120, 0, .7)
    padding: 3em 8em
    border-radius: 2.5em
    font-size: 1.5em

    h2
      text-align: center
      font-size: 1.2em
      max-width: 500px

    .stage
      @include flex-column

    .form-group
      margin-top: 1em
      @include flex-column
      gap: .5em

    label,
    option,
    .elems
      font-size: 0.8em

    input,
    select,
    button
      font-size: 1em
      padding: 10px 20px
      border-radius: 10px
      border: 1px solid transparent

      &:focus
        outline: none

    .form-checkbox
      margin-top: 0.5em

      input
        margin-right: 0.5em

    button
      margin-top: 1em
      &:hover
        box-shadow: 1px 1px 2px 0 #ccc

.slide-fade-enter-active
  transition: all .6s ease

.slide-fade-enter
  transform: translateX(40px)
  opacity: 0

.invalid
  background-color: $warning-bg

.warn
  color: $warning-red

.invalid-warning
  color: $warning-red
  font-size: 0.7em

  &:hover,
  &:focus
    color: black
    text-decoration: none
    cursor: pointer

.message
  font-size: 0.8em

</style>
