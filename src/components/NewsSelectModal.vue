<template>
    <q-modal v-model="isNewsListModalOpen" position="left" :no-backdrop-dismiss="true">
        <h4>Basic Modal </h4>
        <div class="news-list">
            <p class="news-item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur provident ea, nobis quisquam magni illo rerum eveniet quis ut suscipit! Error maxime magni amet nulla, rerum ab delectus inventore explicabo voluptas dolore non enim itaque! Doloribus officiis provident quod officia minus commodi, dignissimos iste expedita aspernatur molestiae velit tempora! Illo et doloremque neque provident laborum aut, alias suscipit dolorum pariatur quia expedita repudiandae consectetur nulla laboriosam ducimus itaque? Labore rerum placeat culpa veniam consequuntur corporis iste, reprehenderit dignissimos, nesciunt sunt similique illum vero magni! Adipisci molestiae sed, quisquam saepe quia debitis laborum autem est consequuntur tempora, dolorum deserunt, quae officia pariatur ut. Rem, vitae. Eaque, non expedita. Voluptatum accusamus nostrum itaque quod. Quaerat molestiae perspiciatis velit porro neque id quas temporibus fugit maiores enim sapiente deleniti vero unde obcaecati quasi suscipit exercitationem eaque sequi quae sit possimus, veritatis dolores vel qui! A quo quasi unde, excepturi, totam voluptatum expedita ea iste, amet eius nam quaerat aliquam alias. Illum sed perferendis itaque, necessitatibus blanditiis nulla sint assumenda possimus dolor distinctio beatae facilis in. Unde expedita mollitia distinctio quia labore, quod doloremque quidem corrupti consequuntur assumenda temporibus est ipsa eos voluptatibus natus repudiandae nostrum architecto necessitatibus voluptatem, quae iusto porro sapiente. Tempora quaerat nemo delectus autem blanditiis libero impedit sed dolores placeat, perferendis doloremque veniam eum quasi! Ut sunt esse dolorem consequatur alias! Tenetur voluptas corrupti dolore nihil blanditiis temporibus, dolor voluptates et soluta sed impedit. Magni veniam dolores, corporis quisquam eligendi dolore, exercitationem rerum distinctio incidunt quae corrupti nemo temporibus reiciendis tempore aspernatur doloribus placeat facere nihil animi, voluptas delectus! Commodi odio a sapiente. Consequatur illum at ipsam nobis ullam neque animi ea repudiandae facere, molestiae fugiat. Nulla debitis eos corporis iste molestiae blanditiis culpa quae minima perspiciatis ullam, rerum, vero laboriosam voluptatum placeat nostrum totam sequi quia eveniet laborum, labore odit in mollitia velit. Necessitatibus deserunt quia, ab quisquam rerum ad delectus ut cumque dicta totam eos ea nostrum, distinctio dignissimos a quo at? Iure beatae quisquam, aspernatur nemo soluta corporis. Molestiae omnis, atque aut distinctio repellat odit veritatis nesciunt placeat veniam, laudantium illum animi dignissimos praesentium, repudiandae reprehenderit neque? Totam, eveniet amet? Quibusdam delectus blanditiis nisi quos perspiciatis, mollitia vero? Eligendi enim facere neque ut sit. Neque nihil dolores ratione delectus nostrum vel corrupti numquam voluptas ex omnis aliquam sit, tempore tempora perferendis mollitia aperiam laborum commodi soluta quibusdam possimus deserunt, quo sint obcaecati unde? Consequuntur ducimus sapiente repudiandae dolores nulla eius obcaecati, delectus reiciendis rem hic non sit voluptates esse odit distinctio magni animi maxime tenetur nam porro asperiores! Quas illo iure ea, blanditiis sit dolor pariatur magni ex cupiditate nemo velit. Adipisci amet incidunt odit. Laboriosam hic quis numquam eos. Laborum earum vero aut quasi, maxime asperiores dignissimos, eos modi eaque beatae quo nihil assumenda, mollitia neque molestiae voluptatum ad necessitatibus eveniet labore. Saepe inventore non placeat fugiat. Illum soluta itaque ullam autem praesentium tempora sint eaque illo voluptate eos, non, error odit obcaecati exercitationem laudantium quis porro. Reprehenderit at iure est maxime nihil, aspernatur culpa natus.</p>
        </div>
        <q-btn color="primary" @click="toggleNewsListModal">Close</q-btn>
    </q-modal>
</template>

<script>
    import {
        QBtn,
        QModal
    } from 'quasar'
    import {
        mapActions,
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                open: false
            }
        },
        computed:{
            ...mapState({
                isNewsListModalOpen: state => state.app.isNewsListModalOpen
            })
        },
        methods:{
            ...mapActions(['toggleNewsListModal', 'closeNewsListModal']),
        },
        components: {
            QBtn,
            QModal
        }
    }
</script>
<style lang="scss" scoped>
    .news-list{
        .news-item{
            min-height: 20vh;
            max-height: 60vh;
            overflow-y: scroll;
        }
         
    }
</style>
