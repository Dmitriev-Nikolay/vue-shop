export const Error = {
    data() {
        return {
            textEr: '',
        }
    },
    methods: {
        setError(textEr) {
            this.textEr = textEr;
        }
    },
    template: `<div class="error-block" v-if="textEr">
                    <p class="error-msg">
                    <button class="btn-close" @click="setError('')"></button>
                    {{ textEr }}
                    </p>
                </div>`
}