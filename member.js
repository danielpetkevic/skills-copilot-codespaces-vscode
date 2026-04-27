function skillsMember(){
    return {
        name: 'skills-member',
        template: `
            <div class="skills-member">
                <div class="skills-member__avatar">
                    <img :src="avatar" alt="Avatar">
                </div>
                <div class="skills-member__info">
                    <h3>{{ name }}</h3>
                    <p>{{ role }}</p>
                </div>
            </div>
        `,
        props: {
            avatar: String,
            name: String,
            role: String
        }
    }
}