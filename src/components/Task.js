import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import Typography from '@material-ui/core/Typography';
export class Task extends React.Component {

    constructor(props) {
        super(props);
    }

   
    render() {
        var cardStyle = {
            justifyContent: 'center',
            alignContent: 'center',
            display: 'block',
            width: '60vw',
            transitionDuration: '0.3s',
            height: 'auto'
        }
        let imagen = this.props.fileUrl.slice(-3) == "pdf" ? "https://www.universidadesenbogota.com/wp-content/uploads/logo-eci.jpg" : this.props.fileUrl
        return (
            
            <div>
                {console.log(this.props.responsible)}
                <center>
                    <Card style={cardStyle}>
                        <BrandCardHeader
                            image={
                                imagen
                            }
                            extra={"USER : " + this.props.responsible.name}
                        />
                        <CardContent>
                            <TextInfoContent
                                overline={'email : ' + this.props.responsible.email}
                                heading={'status: ' + this.props.status}
                                body={this.props.dueDate}                        
                            />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.descripcion}
                            </Typography>
                            {this.props.fileUrl.slice(-3) == "pdf" ? <embed src={this.props.fileUrl} width="500" height="500" /> : <img src={this.props.fileUrl} width="300" height="300" />}
                        </CardContent>

                    </Card>
                </center>
                <br />
                <br/>
            </div>
          
        );
    }

}