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
            height: '30vw'
        }
        return (
            
            <div>
                {console.log(this.props.responsible)}
                <center>
                    <Card style={cardStyle}>
                        <BrandCardHeader
                            image={
                                this.props.fileUrl
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
                        </CardContent>
                    </Card>
                </center>
            </div>
          
        );
    }

}