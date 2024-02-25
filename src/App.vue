<template>
  <div id="app">
    <h1>Создание учётной записи</h1>
    <form ref="form" @submit.prevent="createUser" novalidate>

      <div class="stage" v-show="stage === 1">

        <h2>Основные данные</h2>

        <div class="form-group">
          <label for="surname">Ваша фамилия*</label>
          <input @blur="$v.formData.surname.$touch()"
                  :class="checkStatus(this.$v.formData.surname)"
                  v-model="formData.surname" type="text" name="surname" id="surname" />

          <div v-if="$v.formData.surname.$error && !$v.formData.surname.required" class="invalid-warning">
            {{ messageRequired }}
          </div>

          <div v-if="!$v.formData.surname.alpha" class="invalid-warning">
            {{ messageAlpha }}
          </div>

        </div>

        <div class="form-group">
          <label for="name">Ваше имя*</label>
          <input @blur="$v.formData.name.$touch()"
                  :class="checkStatus(this.$v.formData.name)"
                  v-model="formData.name" type="text" name="name" id="name" />

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
                  v-model="formData.patronymic" type="text" name="patronymic" id="patronymic" />
        </div>

        <div v-if="!$v.formData.patronymic.alpha" class="invalid-warning">
          {{ messageAlpha }}
        </div>

        <div class="form-group">
          <label for="birth_date">Дата рождения*</label>
          <input @blur="$v.formData.birth_date.$touch()"
                  :class="checkStatus(this.$v.formData.birth_date)"
                  v-model="formData.birth_date" type="date" name="birth_date" id="birth_date" />

          <div v-if="$v.formData.birth_date.$error && !$v.formData.birth_date.$required" class="invalid-warning">
            {{ messageRequired }}
          </div>

        </div>

        <div class="form-group">
          <label for="phone">Номер телефона*</label>
          <input v-mask="'+7 (###) ###-##-##'"
                  @blur="$v.formData.phone.$touch()"
                  :class="checkStatus(this.$v.formData.phone)"
                  v-model="formData.phone" type="tel" name="phone" id="phone" />

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
          <label for="clients">Группа клиентов*</label>
          <select @blur="$v.formData.clients.$touch()"
                    :class="checkStatus(this.$v.formData.clients)"
                    v-model="formData.clients" name="clients" id="clients">
            <option disabled value=""></option>
            <option value="vip">VIP</option>
            <option value="problems">Проблемные</option>
            <option value="oms">ОМС</option>
          </select>

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

        <div class="form-group">
          <label for="no_send">Не отправлять СМС</label>
          <input v-model="formData.no_send" type="checkbox" name="no_send" id="no_send" />
        </div>

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
            <input v-model="formData.index" type="text" name="index" id="index" />
          </div>

          <div class="form-group">
            <label for="country">Страна</label>
            <input v-model="formData.country" type="text" name="country" id="country" />
          </div>

          <div class="form-group">
            <label for="region">Область</label>
            <input v-model="formData.region" type="text" name="region" id="region" />
          </div>

          <div class="form-group">
            <label for="city">Город*</label>
            <input @blur="$v.formData.city.$touch()"
                    :class="checkStatus(this.$v.formData.city)"
                    v-model="formData.city" type="text" name="city" id="city" />

          <div v-if="$v.formData.city.$error && !$v.formData.city.required" class="invalid-warning">
            {{ messageRequired }}
          </div>

          <div v-if="!$v.formData.city.alpha" class="invalid-warning">
            {{ messageAlpha }}
          </div>

          </div>

          <div class="form-group">
            <label for="street">Улица</label>
            <input v-model="formData.street" type="text" name="street" id="street" />
          </div>

          <div class="form-group">
            <label for="home">Дом</label>
            <input v-model="formData.home" type="text" name="home" id="home" />
          </div>

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
            <label for="type">Тип документа*</label>
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
            <input v-model="formData.series" type="text" name="series" id="series" />
          </div>

          <div class="form-group">
            <label for="pass_num">Номер</label>
            <input v-model="formData.pass_num" type="text" name="pass_num" id="pass_num" />
          </div>

          <div class="form-group">
            <label for="who_issued">Кем выдан</label>
            <input v-model="formData.who_issued" type="text" name="who_issued" id="who_issued" />
          </div>

          <div class="form-group">
            <label for="date_extradition">Дата выдачи*</label>
            <input @blur="$v.formData.date_extradition.$touch()"
                    :class="checkStatus(this.$v.formData.date_extradition)"
                    v-model="formData.date_extradition" type="date" name="date_extradition" id="date_extradition" />

          <div v-if="$v.formData.date_extradition.$error && !$v.formData.date_extradition.$required" class="invalid-warning">
            {{ messageRequired }}
          </div>

          </div>

          <button @click="prevStage" type="button" class="prev">Назад</button>
          <button @click="showModal = true"
                  :disabled="registrationDisable"
                  type="submit" class="submit">Зарегистрироваться</button>
        </div>
      </transition>
      <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="showModal = false" class="close">&times;</span>
        <p>Вы успешно зарегистрировались!</p>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
import { required, helpers } from 'vuelidate/lib/validators'

const alpha = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)

export default {
  data () {
    return {
      stage: 1,
      messageRequired: 'Поле обязательно для заполнения',
      messageAlpha: 'В поле могут содержаться только буквы',
      formData: {
        surname: '',
        name: '',
        patronymic: '',
        birth_date: '',
        phone: '',
        sex: '',
        clients: '',
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
              this.$v.formData.date_extradition.$invalid
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
      this.stage = 1
      this.$refs.form.reset()
      this.$v.reset()
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
      type: {
        required
      },
      date_extradition: {
        required
      }
    }
  }
}
</script>

<style lang="sass">

@mixin flex-column
  display: flex
  flex-direction: column

#app
  @include flex-column
  justify-content: center
  align-items: center
  gap: 5em

  form
    max-width: 80vw
    background-color: rgba(0, 0, 0, 0.3)
    padding: 3em 10em
    border: 1px solid black
    border-radius: 3em
    font-size: 1.5em

    h2
      font-size: 1.2em

    .stage
      @include flex-column

    .form-group
      margin-top: 1em
      @include flex-column
      gap: .5em

    input,
    select,
    button
      font-size: 1em
      padding: 10px 20px
      border-radius: 10px
      border: 1px solid transparent

      &:focus
        outline: none
        box-shadow: 1px 1px 2px 0 blue

.slide-fade-enter-active
  transition: all .6s ease

.slide-fade-enter
  transform: translateX(40px)
  opacity: 0

.invalid
  background-color: #FF7373

.invalid-warning
  color: #FF7373
  font-size: 0.7em

.modal
  display: none
  position: fixed
  z-index: 1
  left: 0
  top: 0
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,0.5)

.modal-content
  background-color: white
  margin: 15% auto
  padding: 20px
  border: 1px solid #888
  width: 80%

.close
  color: #aaa
  float: right
  font-size: 28px

  &:hover,
  &:focus
    color: black
    text-decoration: none
    cursor: pointer

</style>
