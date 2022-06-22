// const lightbox = require("./lightbox/js/lightbox");

document.addEventListener("DOMContentLoaded", function(){
    //makes the intro text fade in. 
    document.getElementById('intro_title').classList.add('active');

    
});


document.getElementById('about_button').addEventListener('click', aboutOnClick);
document.getElementById('interests_button').addEventListener('click', aboutOnClick);
document.getElementById('details_button').addEventListener('click', aboutOnClick);
document.getElementById('button_hard').addEventListener('click', projectOnClick);
document.getElementById('button_soft').addEventListener('click', projectOnClick);
document.getElementById('button_experience').addEventListener('click', projectOnClick);

/* 
*   Hides and un hides the text in the about section
*/
function aboutOnClick(e){
    //defines all containers
    let containers = ['about', 'interests', 'details'];

    //grab the id of the container associated with the button
    let selected_id = e.target.parentElement.dataset.id;

    //loop through the containers, remove hidden from the one associated with the button, 
    //and add hidden to the ones that arent
    for(let i = 0; i < containers.length; i++){
        let container = containers[i];

        if(container == selected_id){
           document.getElementById(selected_id).classList.remove('hidden');
           document.getElementById('about_title').innerHTML = selected_id.charAt(0).toUpperCase() + selected_id.slice(1);
        }
        else{
            document.getElementById(container).classList.add('hidden');
        }
    }
}

/* 
*   Hides and un hides the text and unwanted containers in the project section
*/
function projectOnClick(e){
    //defines all containers
    let containers = ['hard', 'soft', 'experience'];

    //grab the id of the container associated with the button
    let selected_id = e.target.dataset.id;
    e.target.classList.add('active');
    let starter = selected_id + "-starter";

    
    //console.log(starter);

    //loop through the containers, remove hidden from the one associated with the button, 
    //and add hidden to the ones that arent
    for(let i = 0; i < containers.length; i++){
        let container = containers[i];
        let current_starter = container + "-starter";
        
        if(container == selected_id){
           document.getElementById(selected_id).classList.remove('hidden');
           document.getElementById(starter).classList.remove('hidden');
           document.getElementById('project_section_type').value = container;
           
        }
        else{
            document.getElementById(container).classList.add('hidden');
            document.getElementById(current_starter).classList.add('hidden');
            document.getElementById('button_' + container).classList.remove('active');
            document.getElementById(container + '-starter').classList.add('hidden');
            document.getElementById(container + '_description').classList.add('hidden');
            //hides all children of other containers
        }

        Array.from(document.getElementById(container + '_description').children).forEach(function(child){
            child.classList.add('hidden');
            console.log(child);
           });
    }

    
}

//let json = [];
fetch("skills.json")
  .then(response => response.json())
  .then(json => {
    console.log(json);
    fill_lists(json);
  });

  

function fill_lists(json){
    let lists = ['hard', 'soft', 'experience'];
    
    //fill the lists in the project section with the 
    for(let i = 0; i < json.length; i++){
        let skill = json[i];
        let type = skill['hard-soft'];
        let level = parseInt(skill['level']);
        let name = skill['name'];
        let projects = skill['projects'];
        let write_up = skill['write-up'];
        let icon = skill['Icon'];

        let slug = name.split(' ').join('-').split(',').join();

        let list_container = document.getElementById(type);
        let text_container = document.getElementById(type + "_description")

        let list_item =  document.createElement('div');
        list_item.classList.add('list_item');

        let title = document.createElement('h3');
        title.classList.add('item_title')
        title.innerHTML = name;

        list_item.appendChild(title);
        let level_name = "";
        
        let title_text = document.createElement('h3');


        if(type == 'hard'){
            //Not sure if i'm going to use the word or the stars.. but i've got em both
            if(level == 1){
                level_name = "Passing";
            }
            else if(level == 2){
                level_name = "Moderate";
            }
            else if(level == 3){
                level_name = "Intermediate";
            }
            else if(level == 4){
                level_name = "Advanced";
            }
            else if(level == 5){
                level_name = "Expert"
            }
            console.log(level == 1);

            let level_title = document.createElement('h4');
            level_title.innerHTML = level_name;
            list_item.appendChild(level_title);
            title_text.innerHTML = name;

        }
        else if(type == 'soft'){
            //show icons?
            title_text.innerHTML = name;
        }
        else if(type == 'experience'){
            //show location?
            title_text.innerHTML = icon;
            slug = icon.split(' ').join('-');

            let experience_location = document.createElement('h4');
            experience_location.innerHTML = icon;

            list_item.appendChild(experience_location);
        }
        
        let lightbox_container = document.createElement('div');

            var project_images = [];

            //loop through projects and add them to the container as lightbox images.
            if(projects.length > 0){
                project_images = projects.split("|");
            }
            console.log(project_images);
            console.log(project_images.length);

        if(type != 'soft' & project_images.length > 0){
            for(let j = 0; j < project_images.length; j++){
                var the_image = project_images[j];

                let link = document.createElement('a');
                link.setAttribute('data-lightbox', i);
                link.setAttribute('href', '/images/Experience/' + the_image);
                
                let inner_img = document.createElement('img');
                inner_img.setAttribute('src', '/images/Experience/' + the_image);
                inner_img.classList.add('lightbox_image');

                link.appendChild(inner_img);
                lightbox_container.classList.add('lightbox_container');
                lightbox_container.classList.add('hidden');

                lightbox_container.id = slug + '_lightbox';

                //lightbox_container.addEventListener('click', list_item_click);
                lightbox_container.appendChild(link);
            }
            document.querySelector('.w_projects__info--projects').appendChild(lightbox_container);
        }

        list_item.setAttribute('data-id', slug)
        list_item.addEventListener('click', list_item_click);
        list_container.appendChild(list_item);

        let title_container = document.createElement('div');
        
        title_container.appendChild(title_text);

        let writeup_container = document.createElement('div');
        writeup_container.innerHTML = write_up;

        let skill_container = document.createElement('div');

        skill_container.appendChild(title_container);
        skill_container.appendChild(writeup_container);
        skill_container.classList.add('hidden');
        skill_container.id = slug;
        text_container.appendChild(skill_container);

        //populate skill screen container
    }
}

function list_item_click(e){

    //defines all containers
    let lists = ['hard', 'soft', 'experience'];
    lists.forEach(function(list){
        document.getElementById(list + '_description').classList.add('hidden');
    });

    let current_section = document.getElementById('project_section_type').value;
    let select_container = document.getElementById(current_section + '_description');
    let containers = select_container.children;

    if(current_section != 'soft'){
    //grab the id of the container associated with the button
    let selected_id = e.currentTarget.dataset.id;
    e.target.classList.add('active');

    //let container = document.getElementById(selected_id);

    document.getElementById(current_section + "-starter").classList.add('hidden');

    //loop through the containers, remove hidden from the one associated with the button, 
    //and add hidden to the ones that arent
    for(let i = 0; i < containers.length; i++){
        let container = containers[i];

        if(container.id == selected_id){
            select_container.classList.remove('hidden');
            container.classList.remove('hidden');
            if(document.getElementById(container.id + '_lightbox') != null){
                document.getElementById(selected_id + '_lightbox').classList.remove('hidden');
            }
        }
        else{
            container.classList.add('hidden');
            if(document.getElementById(container.id + '_lightbox') != null){
                document.getElementById(container.id + '_lightbox').classList.add('hidden');
            }
        }
    }
    }
}