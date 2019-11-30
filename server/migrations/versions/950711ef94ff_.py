"""empty message

Revision ID: 950711ef94ff
Revises: 
Create Date: 2019-11-30 14:31:48.077913

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '950711ef94ff'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('netid', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('netid')
    )
    op.create_table('postings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=128), nullable=False),
    sa.Column('desc', sa.String(length=250), nullable=True),
    sa.Column('room', sa.String(length=50), nullable=False),
    sa.Column('building', sa.String(length=128), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('diet', sa.ARRAY(sa.Integer()), nullable=True),
    sa.Column('feeds', sa.Integer(), nullable=True),
    sa.Column('images', sa.ARRAY(sa.String(length=128)), nullable=True),
    sa.Column('owner_id', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.netid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('postings')
    op.drop_table('users')
    # ### end Alembic commands ###
